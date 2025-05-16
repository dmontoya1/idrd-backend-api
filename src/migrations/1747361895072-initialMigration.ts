import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747361895072 implements MigrationInterface {
    name = 'InitialMigration1747361895072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "departmentId" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_5618100486bb99d78de022e5829" UNIQUE ("name"), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "material" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "unitId" integer, CONSTRAINT "UQ_35179a8a2535c1bc2ca56992cbd" UNIQUE ("code"), CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_material" ("id" SERIAL NOT NULL, "quantity" numeric(10,2) NOT NULL DEFAULT '1', "projectId" integer, "materialId" integer, CONSTRAINT "PK_cd27cf50d9f5695455bfc6bcf95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cityId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_c99da3ee823cda1b587b24321dc" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_material" ADD CONSTRAINT "FK_08feee5452b277e686c89d9c239" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_material" ADD CONSTRAINT "FK_17163bd6c3a74db0466ba81b5ec" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_802365a70caeeb191e02009fc06" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_802365a70caeeb191e02009fc06"`);
        await queryRunner.query(`ALTER TABLE "project_material" DROP CONSTRAINT "FK_17163bd6c3a74db0466ba81b5ec"`);
        await queryRunner.query(`ALTER TABLE "project_material" DROP CONSTRAINT "FK_08feee5452b277e686c89d9c239"`);
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_c357cc6b79ec0b39dbff21ca014"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_c99da3ee823cda1b587b24321dc"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_material"`);
        await queryRunner.query(`DROP TABLE "material"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
