import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    // Verificar si ya existe una unidad con el mismo nombre
    const existingUnit = await this.unitsRepository.findOne({
      where: { name: createUnitDto.name },
    });

    if (existingUnit) {
      throw new ConflictException(`Ya existe una unidad con el nombre ${createUnitDto.name}`);
    }

    // Crear la nueva unidad
    const unit = this.unitsRepository.create(createUnitDto);
    return this.unitsRepository.save(unit);
  }

  async findAll(): Promise<Unit[]> {
    return this.unitsRepository.find();
  }

  async findOne(id: number): Promise<Unit> {
    const unit = await this.unitsRepository.findOne({
      where: { id },
    });

    if (!unit) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }

    return unit;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    const unit = await this.findOne(id);

    // Verificar si existe otra unidad con el mismo nombre
    if (updateUnitDto.name) {
      const existingUnit = await this.unitsRepository.findOne({
        where: { name: updateUnitDto.name },
      });

      if (existingUnit && existingUnit.id !== id) {
        throw new ConflictException(`Ya existe una unidad con el nombre ${updateUnitDto.name}`);
      }
    }

    // Actualizar campos
    if (updateUnitDto.name) unit.name = updateUnitDto.name;
    if (updateUnitDto.description) unit.description = updateUnitDto.description;

    return this.unitsRepository.save(unit);
  }

  async remove(id: number): Promise<void> {
    const unit = await this.findOne(id);
    await this.unitsRepository.remove(unit);
  }
}