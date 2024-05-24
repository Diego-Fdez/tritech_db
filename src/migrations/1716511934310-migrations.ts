import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716511934310 implements MigrationInterface {
    name = 'Migrations1716511934310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temperatureData" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mill_component_id" character varying NOT NULL, "temperature" integer NOT NULL, "date" TIMESTAMP NOT NULL, "details" character varying, CONSTRAINT "PK_0bf248a583f51a0ecdb95544f61" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "temperatureData"`);
    }

}
