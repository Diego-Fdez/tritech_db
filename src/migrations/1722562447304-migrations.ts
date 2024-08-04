import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722562447304 implements MigrationInterface {
    name = 'Migrations1722562447304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."answer_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "status" "public"."answer_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`CREATE TYPE "public"."answerOptions_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "answerOptions" ADD "status" "public"."answerOptions_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`CREATE TYPE "public"."question_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "question" ADD "status" "public"."question_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`CREATE TYPE "public"."form_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "form" ADD "status" "public"."form_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."form_status_enum"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."question_status_enum"`);
        await queryRunner.query(`ALTER TABLE "answerOptions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."answerOptions_status_enum"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."answer_status_enum"`);
    }

}
