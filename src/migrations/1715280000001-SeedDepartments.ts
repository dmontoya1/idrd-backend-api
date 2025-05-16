import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDepartments1715280000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO department (name) VALUES 
      ('Amazonas'),
      ('Antioquia'),
      ('Arauca'),
      ('Atlántico'),
      ('Bolívar'),
      ('Boyacá'),
      ('Caldas'),
      ('Caquetá'),
      ('Casanare'),
      ('Cauca'),
      ('Cesar'),
      ('Chocó'),
      ('Córdoba'),
      ('Cundinamarca'),
      ('Guainía'),
      ('Guaviare'),
      ('Huila'),
      ('La Guajira'),
      ('Magdalena'),
      ('Meta'),
      ('Nariño'),
      ('Norte de Santander'),
      ('Putumayo'),
      ('Quindío'),
      ('Risaralda'),
      ('San Andrés y Providencia'),
      ('Santander'),
      ('Sucre'),
      ('Tolima'),
      ('Valle del Cauca'),
      ('Vaupés'),
      ('Vichada');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM department;`);
  }
}