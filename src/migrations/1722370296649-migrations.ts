import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722370296649 implements MigrationInterface {
    name = 'Migrations1722370296649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c"`);
        await queryRunner.query(`ALTER TABLE "responses" ALTER COLUMN "form_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responses" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "question_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4c7564021a60d15e709c4760a91"`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "form_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_efcb3a58fefe737ab133492ae69"`);
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "client_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "created_by_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4c7564021a60d15e709c4760a91" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_efcb3a58fefe737ab133492ae69" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_efcb3a58fefe737ab133492ae69"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4c7564021a60d15e709c4760a91"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96"`);
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "created_by_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_efcb3a58fefe737ab133492ae69" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "form_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4c7564021a60d15e709c4760a91" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "question_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responses" ALTER COLUMN "form_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
