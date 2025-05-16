// materials/materials.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { UnitsService } from '../units/units.service';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
    private unitsService: UnitsService,
  ) {}

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