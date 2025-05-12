import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Unit } from '../../units/entities/unit.entity';
import { ProjectMaterial } from '../../project-materials/entities/project-material.entity';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @ManyToOne(() => Unit, (unit) => unit.materials)
  unit: Unit;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => ProjectMaterial, (projectMaterial) => projectMaterial.material)
  projectMaterials: ProjectMaterial[];
}