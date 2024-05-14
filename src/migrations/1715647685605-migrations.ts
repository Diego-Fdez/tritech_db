import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715647685605 implements MigrationInterface {
    name = 'Migrations1715647685605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_name" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_22f7e5f9138149a624c88dfcc84" UNIQUE ("client_name"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
