import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718896925934 implements MigrationInterface {
    name = 'Migrations1718896925934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."templates_template_type_enum" AS ENUM('TB', 'TT', 'II', 'CH')`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "template_type" "public"."templates_template_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "template_type"`);
        await queryRunner.query(`DROP TYPE "public"."templates_template_type_enum"`);
    }

}
