import { Controller, Get, Post, Body, Param, Delete, Put, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@ApiTags('materials')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los materiales' })
  @ApiResponse({ status: 200, description: 'Lista de materiales' })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un material por ID' })
  @ApiResponse({ status: 200, description: 'Material encontrado' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo material' })
  @ApiResponse({ status: 201, description: 'Material creado' })
  @ApiResponse({ status: 409, description: 'Conflicto: material ya existe' })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un material por ID' })
  @ApiResponse({ status: 200, description: 'Material actualizado' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un material por ID' })
  @ApiResponse({ status: 200, description: 'Material eliminado' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.remove(id);
  }
}