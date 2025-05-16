import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectMaterialDto {
  @ApiProperty({ description: 'ID del proyecto' })
  @IsNotEmpty({ message: 'El proyecto es requerido' })
  @IsNumber({}, { message: 'El ID del proyecto debe ser un número' })
  projectId: number;

  @ApiProperty({ description: 'ID del material' })
  @IsNotEmpty({ message: 'El material es requerido' })
  @IsNumber({}, { message: 'El ID del material debe ser un número' })
  materialId: number;

  @ApiProperty({ description: 'Cantidad del material', default: 1 })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(0.01, { message: 'La cantidad debe ser mayor a 0' })
  quantity: number = 1;
}