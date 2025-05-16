import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUnits1715280000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO unit (name, description) VALUES 
      ('M²', 'Metro cuadrado'),
      ('Unidad', 'Unidad individual'),
      ('Kg', 'Kilogramo');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM unit WHERE name IN ('M²', 'Unidad', 'Kg');`);
  }
}
