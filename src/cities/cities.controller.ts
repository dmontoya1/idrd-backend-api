import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ciudad' })
  @ApiResponse({ status: 201, description: 'Ciudad creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto, la ciudad ya existe en ese departamento' })
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ciudades' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades' })
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ciudad por ID' })
  @ApiResponse({ status: 200, description: 'Ciudad encontrada' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una ciudad' })
  @ApiResponse({ status: 200, description: 'Ciudad actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 404, description: 'Ciudad o departamento no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto, la ciudad ya existe en ese departamento' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ciudad' })
  @ApiResponse({ status: 200, description: 'Ciudad eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.remove(id);
  }
}