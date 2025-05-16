import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMaterialDto {
  @ApiProperty({ description: 'Código único del material', required: false })
  @IsOptional()
  @IsString({ message: 'El código debe ser texto' })
  code?: string;

  @ApiProperty({ description: 'Descripción del material', required: false })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;

  @ApiProperty({ description: 'ID de la unidad', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la unidad debe ser un número' })
  unitId?: number;

  @ApiProperty({ description: 'Precio del material en pesos', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price?: number;
}