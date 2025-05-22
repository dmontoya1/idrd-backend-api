// materials/materials.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { UnitsService } from '../units/units.service';
import { FilterMaterialsDto } from './dto/filter-materials.dto';
import { PaginatedResponseDto } from '../core/dto/paginated-response.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
    private unitsService: UnitsService,
  ) {}

  async findAllPaginated(filterDto: FilterMaterialsDto): Promise<PaginatedResponseDto<Material>> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC', search } = filterDto;

    const queryBuilder = this.materialsRepository
      .createQueryBuilder('material')
      .leftJoinAndSelect('material.unit', 'unit');

    // Aplicar filtros
    this.applyFilters(queryBuilder, filterDto);

    // Aplicar búsqueda general
    if (search) {
      queryBuilder.andWhere(
        '(material.code ILIKE :search OR material.description ILIKE :search OR unit.name ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Aplicar ordenamiento
    const validSortFields = ['id', 'code', 'description', 'price', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
    queryBuilder.orderBy(`material.${sortField}`, sortOrder);

    // Aplicar paginación
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Ejecutar consulta
    const [materials, totalItems] = await queryBuilder.getManyAndCount();

    return new PaginatedResponseDto(materials, totalItems, page, limit);
  }

  private applyFilters(queryBuilder: SelectQueryBuilder<Material>, filterDto: FilterMaterialsDto): void {
    const { code, description, unitId, minPrice, maxPrice } = filterDto;

    if (code) {
      queryBuilder.andWhere('material.code ILIKE :code', { code: `%${code}%` });
    }

    if (description) {
      queryBuilder.andWhere('material.description ILIKE :description', { description: `%${description}%` });
    }

    if (unitId) {
      queryBuilder.andWhere('material.unitId = :unitId', { unitId });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('material.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('material.price <= :maxPrice', { maxPrice });
    }
  }

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    // Verificar si ya existe un material con el mismo código
    const existingMaterial = await this.materialsRepository.findOne({
      where: { code: createMaterialDto.code },
    });

    if (existingMaterial) {
      throw new ConflictException(`Ya existe un material con el código ${createMaterialDto.code}`);
    }

    // Buscar la unidad
    const unit = await this.unitsService.findOne(createMaterialDto.unitId);

    // Crear el nuevo material
    const material = this.materialsRepository.create({
      code: createMaterialDto.code,
      description: createMaterialDto.description,
      price: createMaterialDto.price,
      unit,
    });

    return this.materialsRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialsRepository.find({ relations: ['unit'] });
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialsRepository.findOne({
      where: { id },
      relations: ['unit'],
    });

    if (!material) {
      throw new NotFoundException(`Material con ID ${id} no encontrado`);
    }

    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<Material> {
    const material = await this.findOne(id);

    // Actualizar unidad si se proporciona
    if (updateMaterialDto.unitId) {
      const unit = await this.unitsService.findOne(updateMaterialDto.unitId);
      material.unit = unit;
    }

    // Actualizar otros campos
    if (updateMaterialDto.code) material.code = updateMaterialDto.code;
    if (updateMaterialDto.description) material.description = updateMaterialDto.description;
    if (updateMaterialDto.price) material.price = updateMaterialDto.price;

    return this.materialsRepository.save(material);
  }

  async remove(id: number): Promise<void> {
    const material = await this.findOne(id);
    await this.materialsRepository.remove(material);
  }
}