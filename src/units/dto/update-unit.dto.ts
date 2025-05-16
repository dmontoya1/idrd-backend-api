import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitDto {
  @ApiProperty({ description: 'Nombre de la unidad', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  name?: string;

  @ApiProperty({ description: 'Descripción de la unidad', required: false })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;
}