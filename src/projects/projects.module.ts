import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CitiesModule } from '../cities/cities.module';
import { ProjectMaterialsModule } from '../project-materials/project-materials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    CitiesModule,
    ProjectMaterialsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}