import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { PaginatedResponseDto } from '../core/dto/paginated-response.dto';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private citiesService: CitiesService,
  ) {}

  async findAllPaginated(filterDto: FilterProjectsDto): Promise<PaginatedResponseDto<Project>> {
    const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC', search } = filterDto;

    const queryBuilder = this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.city', 'city')
      .leftJoinAndSelect('city.department', 'department');

    // Aplicar filtros
    this.applyFilters(queryBuilder, filterDto);

    // Aplicar búsqueda general
    if (search) {
      queryBuilder.andWhere(
        '(project.name ILIKE :search OR city.name ILIKE :search OR department.name ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Aplicar ordenamiento
    const validSortFields = ['id', 'name', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
    queryBuilder.orderBy(`project.${sortField}`, sortOrder);

    // Aplicar paginación
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Ejecutar consulta
    const [projects, totalItems] = await queryBuilder.getManyAndCount();

    return new PaginatedResponseDto(projects, totalItems, page, limit);
  }

  private applyFilters(queryBuilder: SelectQueryBuilder<Project>, filterDto: FilterProjectsDto): void {
    const { name, cityId, departmentId } = filterDto;

    if (name) {
      queryBuilder.andWhere('project.name ILIKE :name', { name: `%${name}%` });
    }

    if (cityId) {
      queryBuilder.andWhere('project.cityId = :cityId', { cityId });
    }

    if (departmentId) {
      queryBuilder.andWhere('city.departmentId = :departmentId', { departmentId });
    }
  }

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