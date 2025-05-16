import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Nombre del proyecto', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  name?: string;

  @ApiProperty({ description: 'ID de la ciudad', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la ciudad debe ser un número' })
  cityId?: number;
}