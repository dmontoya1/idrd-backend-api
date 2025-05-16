import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    // Verificar si ya existe un departamento con el mismo nombre
    const existingDepartment = await this.departmentsRepository.findOne({
      where: { name: createDepartmentDto.name },
    });

    if (existingDepartment) {
      throw new ConflictException(`Ya existe un departamento con el nombre ${createDepartmentDto.name}`);
    }

    // Crear el nuevo departamento
    const department = this.departmentsRepository.create(createDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentsRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }

    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findOne(id);

    // Verificar si existe otro departamento con el mismo nombre
    if (updateDepartmentDto.name) {
      const existingDepartment = await this.departmentsRepository.findOne({
        where: { name: updateDepartmentDto.name },
      });

      if (existingDepartment && existingDepartment.id !== id) {
        throw new ConflictException(`Ya existe un departamento con el nombre ${updateDepartmentDto.name}`);
      }
    }

    // Actualizar campos
    if (updateDepartmentDto.name) department.name = updateDepartmentDto.name;

    return this.departmentsRepository.save(department);
  }

  async remove(id: number): Promise<void> {
    const department = await this.findOne(id);
    await this.departmentsRepository.remove(department);
  }
}