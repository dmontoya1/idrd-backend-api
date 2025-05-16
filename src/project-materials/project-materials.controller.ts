import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ProjectMaterialsService } from './project-materials.service';
import { CreateProjectMaterialDto } from './dto/create-project-material.dto';
import { UpdateProjectMaterialDto } from './dto/update-project-material.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('project-materials')
@Controller('project-materials')
export class ProjectMaterialsController {
  constructor(private readonly projectMaterialsService: ProjectMaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Asignar un material a un proyecto' })
  @ApiResponse({ status: 201, description: 'Material asignado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Proyecto o material no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto, el material ya está asignado al proyecto' })
  create(@Body() createProjectMaterialDto: CreateProjectMaterialDto) {
    return this.projectMaterialsService.create(createProjectMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las asignaciones de materiales a proyectos' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones' })
  findAll() {
    return this.projectMaterialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignación por ID' })
  @ApiResponse({ status: 200, description: 'Asignación encontrada' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectMaterialsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una asignación' })
  @ApiResponse({ status: 200, description: 'Asignación actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProjectMaterialDto: UpdateProjectMaterialDto) {
    return this.projectMaterialsService.update(id, updateProjectMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una asignación' })
  @ApiResponse({ status: 200, description: 'Asignación eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectMaterialsService.remove(id);
  }
}