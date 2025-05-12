import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.cities)
  department: Department;

  @OneToMany(() => Project, (project) => project.city)
  projects: Project[];
}