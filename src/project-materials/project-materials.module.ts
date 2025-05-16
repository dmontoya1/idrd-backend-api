import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMaterialsController } from './project-materials.controller';
import { ProjectMaterialsService } from './project-materials.service';
import { ProjectMaterial } from './entities/project-material.entity';
import { ProjectsModule } from '../projects/projects.module';
import { MaterialsModule } from '../materials/materials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectMaterial]),
    forwardRef(() => ProjectsModule), // Evitar dependencia circular
    MaterialsModule,
  ],
  controllers: [ProjectMaterialsController],
  providers: [ProjectMaterialsService],
  exports: [ProjectMaterialsService],
})
export class ProjectMaterialsModule {}