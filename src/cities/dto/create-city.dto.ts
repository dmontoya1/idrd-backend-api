import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ description: 'Nombre de la ciudad' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  name: string;

  @ApiProperty({ description: 'ID del departamento' })
  @IsNotEmpty({ message: 'El departamento es requerido' })
  @IsNumber({}, { message: 'El ID del departamento debe ser un número' })
  departmentId: number;
}