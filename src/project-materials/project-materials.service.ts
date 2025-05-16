import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMaterial } from './entities/project-material.entity';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';
import { ProjectMaterialReportDto } from './dto/project-material-report.dto';
import { ProjectsService } from '../projects/projects.service';
import { MaterialsService } from '../materials/materials.service';

@Injectable()
export class ProjectMaterialsService {
  constructor(
    @InjectRepository(ProjectMaterial)
    private projectMaterialsRepository: Repository<ProjectMaterial>,
    private projectsService: ProjectsService,
    private materialsService: MaterialsService,
  ) {}

  async create(createProjectMaterialDto: CreateProjectMaterialDto): Promise<ProjectMaterial> {
    // Buscar el proyecto y el material
    const project = await this.projectsService.findOne(createProjectMaterialDto.projectId);
    const material = await this.materialsService.findOne(createProjectMaterialDto.materialId);

    // Verificar si ya existe este material en el proyecto
    const existingProjectMaterial = await this.projectMaterialsRepository.findOne({
      where: {
        project: { id: project.id },
        material: { id: material.id },
      },
      relations: ['project', 'material'],
    });

    if (existingProjectMaterial) {
      throw new ConflictException(`El material ${material.code} ya está asignado al proyecto ${project.name}`);
    }

    // Crear la nueva asignación
    const projectMaterial = this.projectMaterialsRepository.create({
      project,
      material,
      quantity: createProjectMaterialDto.quantity,
    });

    return this.projectMaterialsRepository.save(projectMaterial);
  }

  async findAll(): Promise<ProjectMaterial[]> {
    return this.projectMaterialsRepository.find({
      relations: ['project', 'material', 'material.unit', 'project.city', 'project.city.department'],
    });
  }

  async findByProject(projectId: number): Promise<ProjectMaterial[]> {
    // Verificar que el proyecto existe
    await this.projectsService.findOne(projectId);

    return this.projectMaterialsRepository.find({
      where: { project: { id: projectId } },
      relations: ['project', 'material', 'material.unit'],
    });
  }

  async findOne(id: number): Promise<ProjectMaterial> {
    const projectMaterial = await this.projectMaterialsRepository.findOne({
      where: { id },
      relations: ['project', 'material', 'material.unit'],
    });

    if (!projectMaterial) {
      throw new NotFoundException(`Asignación de material con ID ${id} no encontrada`);
    }

    return projectMaterial;
  }

  async update(id: number, updateProjectMaterialDto: UpdateProjectMaterialDto): Promise<ProjectMaterial> {
    const projectMaterial = await this.findOne(id);

    // Actualizar cantidad si se proporciona
    if (updateProjectMaterialDto.quantity) {
      projectMaterial.quantity = updateProjectMaterialDto.quantity;
    }

    return this.projectMaterialsRepository.save(projectMaterial);
  }

  async remove(id: number): Promise<void> {
    const projectMaterial = await this.findOne(id);
    await this.projectMaterialsRepository.remove(projectMaterial);
  }

  async generateReport(projectId: number): Promise<ProjectMaterialReportDto> {
    // Verificar que el proyecto existe
    const project = await this.projectsService.findOne(projectId);

    // Obtener los materiales del proyecto
    const projectMaterials = await this.findByProject(projectId);

    // Calcular subtotales y total
    let totalCost = 0;
    const materialsReport = projectMaterials.map(pm => {
      const subtotal = pm.quantity * pm.material.price;
      totalCost += subtotal;

      return {
        id: pm.id,
        code: pm.material.code,
        description: pm.material.description,
        unitName: pm.material.unit.name,
        price: pm.material.price,
        quantity: pm.quantity,
        subtotal,
      };
    });

    // Construir reporte
    const report: ProjectMaterialReportDto = {
      projectId: project.id,
      projectName: project.name,
      materials: materialsReport,
      totalCost,
    };

    return report;
  }
}