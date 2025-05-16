import { IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectMaterialDto {
  @ApiProperty({ description: 'Cantidad del material', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(0.01, { message: 'La cantidad debe ser mayor a 0' })
  quantity?: number;
}