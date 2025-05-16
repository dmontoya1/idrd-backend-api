import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    forwardRef(() => DepartmentsModule), // Evitar dependencia circular
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
