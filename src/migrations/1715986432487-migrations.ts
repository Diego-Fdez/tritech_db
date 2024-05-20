import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715986432487 implements MigrationInterface {
    name = 'Migrations1715986432487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" character varying NOT NULL, "template_name" character varying NOT NULL, "created_by" character varying NOT NULL, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "templates"`);
    }

}
