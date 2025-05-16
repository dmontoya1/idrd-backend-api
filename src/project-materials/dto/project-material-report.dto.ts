import { ApiProperty } from '@nestjs/swagger';

class MaterialReportItem {
  @ApiProperty({ description: 'ID del material' })
  id: number;

  @ApiProperty({ description: 'Código del material' })
  code: string;

  @ApiProperty({ description: 'Descripción del material' })
  description: string;

  @ApiProperty({ description: 'Nombre de la unidad' })
  unitName: string;

  @ApiProperty({ description: 'Precio unitario del material' })
  price: number;

  @ApiProperty({ description: 'Cantidad del material' })
  quantity: number;

  @ApiProperty({ description: 'Subtotal (precio * cantidad)' })
  subtotal: number;
}

export class ProjectMaterialReportDto {
  @ApiProperty({ description: 'ID del proyecto' })
  projectId: number;

  @ApiProperty({ description: 'Nombre del proyecto' })
  projectName: string;

  @ApiProperty({ description: 'Lista de materiales', type: [MaterialReportItem] })
  materials: MaterialReportItem[];

  @ApiProperty({ description: 'Costo total de los materiales' })
  totalCost: number;
}