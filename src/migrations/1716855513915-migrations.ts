import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716855513915 implements MigrationInterface {
    name = 'Migrations1716855513915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_876c197c0b264bef7a494c80fb0"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "client_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "client_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_876c197c0b264bef7a494c80fb0" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
