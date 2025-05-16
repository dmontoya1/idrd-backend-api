import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private citiesService: CitiesService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // Buscar la ciudad
    const city = await this.citiesService.findOne(createProjectDto.cityId);

    // Crear el nuevo proyecto
    const project = this.projectsRepository.create({
      name: createProjectDto.name,
      city,
    });

    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      relations: ['city', 'city.department'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['city', 'city.department'],
    });

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    // Si se actualiza la ciudad, verificarla
    if (updateProjectDto.cityId) {
      const city = await this.citiesService.findOne(updateProjectDto.cityId);
      project.city = city;
    }

    // Actualizar nombre si se proporciona
    if (updateProjectDto.name) {
      project.name = updateProjectDto.name;
    }

    return this.projectsRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }
}