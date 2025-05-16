import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UnitsModule } from './units/units.module';
import { MaterialsModule } from './materials/materials.module';
import { DepartmentsModule } from './departments/departments.module';
import { CitiesModule } from './cities/cities.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectMaterialsModule } from './project-materials/project-materials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'idrd'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC', false),
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: true,
      }),
    }),
    UnitsModule,
    MaterialsModule,
    DepartmentsModule,
    CitiesModule,
    ProjectsModule,
    ProjectMaterialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}