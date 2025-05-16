import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Nombre del proyecto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  name: string;

  @ApiProperty({ description: 'ID de la ciudad' })
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  @IsNumber({}, { message: 'El ID de la ciudad debe ser un número' })
  cityId: number;
}