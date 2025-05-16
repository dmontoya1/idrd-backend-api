import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({ description: 'Código único del material' })
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString({ message: 'El código debe ser texto' })
  code: string;

  @ApiProperty({ description: 'Descripción del material' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser texto' })
  description: string;

  @ApiProperty({ description: 'ID de la unidad' })
  @IsNotEmpty({ message: 'La unidad es requerida' })
  @IsNumber({}, { message: 'El ID de la unidad debe ser un número' })
  unitId: number;

  @ApiProperty({ description: 'Precio del material en pesos' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;
}