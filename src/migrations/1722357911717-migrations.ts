import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722357911717 implements MigrationInterface {
    name = 'Migrations1722357911717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "form_id" uuid, "user_id" uuid, CONSTRAINT "PK_be3bdac59bd243dff421ad7bf70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "answer_value" character varying NOT NULL, "question_id" uuid, "response_id" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type_question" character varying NOT NULL, "text_question" character varying NOT NULL, "order" integer NOT NULL, "form_id" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "client_id" uuid, "created_by_id" uuid, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "is_sent"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "details"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "temperature_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4c7564021a60d15e709c4760a91" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_efcb3a58fefe737ab133492ae69" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_efcb3a58fefe737ab133492ae69"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4c7564021a60d15e709c4760a91"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP COLUMN "temperature_id"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "details" character varying`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD "is_sent" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "responses"`);
    }

}
