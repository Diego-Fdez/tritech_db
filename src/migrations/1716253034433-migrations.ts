import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716253034433 implements MigrationInterface {
    name = 'Migrations1716253034433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sugarCaneMills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tandem_count" integer NOT NULL, "mill_name" character varying NOT NULL, "template_id" character varying NOT NULL, CONSTRAINT "PK_e7d2f04bc097bfb9c1504d3a01f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sugarCaneMills"`);
    }

}
