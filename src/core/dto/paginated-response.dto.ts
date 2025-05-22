// src/app/core/dto/paginated-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Datos de la página actual' })
  data: T[];

  @ApiProperty({ description: 'Información de paginación' })
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };

  constructor(data: T[], totalItems: number, page: number, limit: number) {
    this.data = data;
    const totalPages = Math.ceil(totalItems / limit);

    this.pagination = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}