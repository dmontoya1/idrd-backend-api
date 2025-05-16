import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'Nombre del departamento', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  name?: string;
}