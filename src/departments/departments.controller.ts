import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CitiesService } from '../cities/cities.service';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly citiesService: CitiesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo departamento' })
  @ApiResponse({ status: 201, description: 'Departamento creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 409, description: 'Conflicto, el departamento ya existe' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  @ApiResponse({ status: 200, description: 'Lista de departamentos' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un departamento por ID' })
  @ApiResponse({ status: 200, description: 'Departamento encontrado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Get(':id/cities')
  @ApiOperation({ summary: 'Obtener ciudades de un departamento' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades del departamento' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  findCities(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findByDepartment(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un departamento' })
  @ApiResponse({ status: 200, description: 'Departamento actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto, el nombre ya existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un departamento' })
  @ApiResponse({ status: 200, description: 'Departamento eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id);
  }
}