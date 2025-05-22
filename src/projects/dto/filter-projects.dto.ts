import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FilterProjectsDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtrar por nombre del proyecto' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filtrar por ID de ciudad' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cityId?: number;

  @ApiPropertyOptional({ description: 'Filtrar por ID de departamento' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  departmentId?: number;
}