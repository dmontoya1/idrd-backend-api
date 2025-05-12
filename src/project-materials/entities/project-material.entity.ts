import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Material } from '../../materials/entities/material.entity';

@Entity()
export class ProjectMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.projectMaterials)
  project: Project;

  @ManyToOne(() => Material, (material) => material.projectMaterials)
  material: Material;

  @Column('decimal', { precision: 10, scale: 2, default: 1 })
  quantity: number;
}