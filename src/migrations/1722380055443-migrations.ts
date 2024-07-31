import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722380055443 implements MigrationInterface {
    name = 'Migrations1722380055443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answerOptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "option_text" character varying NOT NULL, "question_id" uuid NOT NULL, CONSTRAINT "PK_bf59858c998e89aedbcbb8febd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answerOptions" ADD CONSTRAINT "FK_cf0808f8c293fc1952afcb34178" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answerOptions" DROP CONSTRAINT "FK_cf0808f8c293fc1952afcb34178"`);
        await queryRunner.query(`DROP TABLE "answerOptions"`);
    }

}
