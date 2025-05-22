import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../core/dto/pagination.dto';

export class FilterProjectMaterialsDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtrar por ID de proyecto' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  projectId?: number;

  @ApiPropertyOptional({ description: 'Filtrar por ID de material' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  materialId?: number;

  @ApiPropertyOptional({ description: 'Cantidad mínima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minQuantity?: number;

  @ApiPropertyOptional({ description: 'Cantidad máxima' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxQuantity?: number;
}