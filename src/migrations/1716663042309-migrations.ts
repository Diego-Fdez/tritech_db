import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716663042309 implements MigrationInterface {
    name = 'Migrations1716663042309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD "mill_components_id" uuid`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "mill_component_id"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "mill_component_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD CONSTRAINT "UQ_7ea304ed977294a6e046228fdd8" UNIQUE ("mill_component_id")`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "sugar_cane_mill_id"`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "sugar_cane_mill_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "UQ_1f60b470b2686700e324cd62c98" UNIQUE ("sugar_cane_mill_id")`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP COLUMN "template_id"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD "template_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD CONSTRAINT "UQ_b8f400b2a7fb1627b027993f7d3" UNIQUE ("template_id")`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD CONSTRAINT "FK_7ea304ed977294a6e046228fdd8" FOREIGN KEY ("mill_component_id") REFERENCES "millComponents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "FK_1f60b470b2686700e324cd62c98" FOREIGN KEY ("sugar_cane_mill_id") REFERENCES "sugarCaneMills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD CONSTRAINT "FK_b8f400b2a7fb1627b027993f7d3" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD CONSTRAINT "FK_eb16839db9113ffc9fb5dca1d63" FOREIGN KEY ("mill_components_id") REFERENCES "millComponents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP CONSTRAINT "FK_eb16839db9113ffc9fb5dca1d63"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP CONSTRAINT "FK_b8f400b2a7fb1627b027993f7d3"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "FK_1f60b470b2686700e324cd62c98"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP CONSTRAINT "FK_7ea304ed977294a6e046228fdd8"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP CONSTRAINT "UQ_b8f400b2a7fb1627b027993f7d3"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP COLUMN "template_id"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD "template_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "UQ_1f60b470b2686700e324cd62c98"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "sugar_cane_mill_id"`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "sugar_cane_mill_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP CONSTRAINT "UQ_7ea304ed977294a6e046228fdd8"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "mill_component_id"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "mill_component_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP COLUMN "mill_components_id"`);
    }

}
