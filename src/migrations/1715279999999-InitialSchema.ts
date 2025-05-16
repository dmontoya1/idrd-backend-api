import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1715279999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Creación de tablas ya manejada por TypeORM
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar tablas
  }
}