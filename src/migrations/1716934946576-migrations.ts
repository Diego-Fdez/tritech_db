import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716934946576 implements MigrationInterface {
    name = 'Migrations1716934946576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP CONSTRAINT "FK_7ea304ed977294a6e046228fdd8"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP CONSTRAINT "UQ_7ea304ed977294a6e046228fdd8"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD CONSTRAINT "FK_7ea304ed977294a6e046228fdd8" FOREIGN KEY ("mill_component_id") REFERENCES "millComponents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP CONSTRAINT "FK_7ea304ed977294a6e046228fdd8"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD CONSTRAINT "UQ_7ea304ed977294a6e046228fdd8" UNIQUE ("mill_component_id")`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD CONSTRAINT "FK_7ea304ed977294a6e046228fdd8" FOREIGN KEY ("mill_component_id") REFERENCES "millComponents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
