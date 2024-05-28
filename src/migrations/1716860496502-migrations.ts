import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716860496502 implements MigrationInterface {
    name = 'Migrations1716860496502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "FK_1f60b470b2686700e324cd62c98"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "UQ_1f60b470b2686700e324cd62c98"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "sugar_cane_mill_id"`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "sugar_cane_mill_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "sugar_cane_mill_id"`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "sugar_cane_mill_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "UQ_1f60b470b2686700e324cd62c98" UNIQUE ("sugar_cane_mill_id")`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "FK_1f60b470b2686700e324cd62c98" FOREIGN KEY ("sugar_cane_mill_id") REFERENCES "sugarCaneMills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
