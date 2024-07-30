import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722363874616 implements MigrationInterface {
    name = 'Migrations1722363874616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "date" TIMESTAMP NOT NULL`);
    }

}
