import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { ProjectMaterial } from '../../project-materials/entities/project-material.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => City, (city) => city.projects)
  city: City;

  @OneToMany(() => ProjectMaterial, (projectMaterial) => projectMaterial.project)
  projectMaterials: ProjectMaterial[];
}