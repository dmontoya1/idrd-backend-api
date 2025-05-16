import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiProperty({ description: 'Nombre de la ciudad', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  name?: string;

  @ApiProperty({ description: 'ID del departamento', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del departamento debe ser un número' })
  departmentId?: number;
}