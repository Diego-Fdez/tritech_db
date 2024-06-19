import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718749378156 implements MigrationInterface {
    name = 'Migrations1718749378156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "web"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "status" character varying NOT NULL DEFAULT 'incomplete'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "web" character varying NOT NULL`);
    }

}
