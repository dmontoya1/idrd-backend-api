import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@ApiTags('units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las unidades' })
  @ApiResponse({ status: 200, description: 'Lista de unidades' })
  findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una unidad por ID' })
  @ApiResponse({ status: 200, description: 'Unidad encontrada' })
  @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unitsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva unidad' })
  @ApiResponse({ status: 201, description: 'Unidad creada' })
  @ApiResponse({ status: 409, description: 'Conflicto: unidad ya existe' })
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una unidad por ID' })
  @ApiResponse({ status: 200, description: 'Unidad actualizada' })
  @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitsService.update(id, updateUnitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una unidad por ID' })
  @ApiResponse({ status: 200, description: 'Unidad eliminada' })
  @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unitsService.remove(id);
  }
}