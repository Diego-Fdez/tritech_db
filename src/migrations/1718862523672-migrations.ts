import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718862523672 implements MigrationInterface {
    name = 'Migrations1718862523672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "is_sent" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "is_sent"`);
    }

}
