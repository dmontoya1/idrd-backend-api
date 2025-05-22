import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectMaterialsService } from '../project-materials/project-materials.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectMaterialsService: ProjectMaterialsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener proyectos con paginación y filtros' })
  @ApiResponse({ status: 200, description: 'Lista paginada de proyectos' })
  findAllPaginated(@Query() filterDto: FilterProjectsDto) {
    return this.projectsService.findAllPaginated(filterDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Obtener todos los proyectos sin paginación' })
  @ApiResponse({ status: 200, description: 'Lista completa de proyectos' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @Get(':id/materials')
  @ApiOperation({ summary: 'Obtener materiales de un proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de materiales del proyecto' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findMaterials(@Param('id', ParseIntPipe) id: number) {
    return this.projectMaterialsService.findByProject(id);
  }

  @Get(':id/materials/report')
  @ApiOperation({ summary: 'Obtener reporte de materiales de un proyecto' })
  @ApiResponse({ status: 200, description: 'Reporte de materiales del proyecto' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  getMaterialsReport(@Param('id', ParseIntPipe) id: number) {
    return this.projectMaterialsService.generateReport(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Proyecto o ciudad no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}