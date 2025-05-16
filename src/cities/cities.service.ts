import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
    private departmentsService: DepartmentsService,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    // Buscar el departamento
    const department = await this.departmentsService.findOne(createCityDto.departmentId);

    // Verificar si ya existe una ciudad con el mismo nombre en el mismo departamento
    const existingCity = await this.citiesRepository.findOne({
      where: {
        name: createCityDto.name,
        department: { id: department.id }
      },
      relations: ['department'],
    });

    if (existingCity) {
      throw new ConflictException(`Ya existe una ciudad con el nombre ${createCityDto.name} en el departamento ${department.name}`);
    }

    // Crear la nueva ciudad
    const city = this.citiesRepository.create({
      name: createCityDto.name,
      department,
    });

    return this.citiesRepository.save(city);
  }

  async findAll(): Promise<City[]> {
    return this.citiesRepository.find({ relations: ['department'] });
  }

  async findByDepartment(departmentId: number): Promise<City[]> {
    return this.citiesRepository.find({
      where: { department: { id: departmentId } },
      relations: ['department'],
    });
  }

  async findOne(id: number): Promise<City> {
    const city = await this.citiesRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!city) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }

    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);

    // Si se actualiza el departamento, verificarlo
    let department = city.department;
    if (updateCityDto.departmentId) {
      department = await this.departmentsService.findOne(updateCityDto.departmentId);
    }

    // Verificar si existe otra ciudad con el mismo nombre en el mismo departamento
    if (updateCityDto.name || updateCityDto.departmentId) {
      const existingCity = await this.citiesRepository.findOne({
        where: {
          name: updateCityDto.name || city.name,
          department: { id: department.id }
        },
        relations: ['department'],
      });

      if (existingCity && existingCity.id !== id) {
        throw new ConflictException(`Ya existe una ciudad con el nombre ${updateCityDto.name || city.name} en el departamento ${department.name}`);
      }
    }

    // Actualizar campos
    if (updateCityDto.name) city.name = updateCityDto.name;
    city.department = department;

    return this.citiesRepository.save(city);
  }

  async remove(id: number): Promise<void> {
    const city = await this.findOne(id);
    await this.citiesRepository.remove(city);
  }
}