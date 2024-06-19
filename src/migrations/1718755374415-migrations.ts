import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718755374415 implements MigrationInterface {
    name = 'Migrations1718755374415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "FK_1f60b470b2686700e324cd62c98"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "component_type"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_component_type_enum"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "sugar_cane_mill_id"`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "template_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_mill_name_enum" AS ENUM('Molino 1', 'Molino 2', 'Molino 3', 'Molino 4', 'Molino 5', 'Molino 6')`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "mill_name" "public"."millComponents_mill_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "tandem_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "FK_a15bd7c2472d6f3c542bcd1593b" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "FK_a15bd7c2472d6f3c542bcd1593b"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "tandem_number"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "mill_name"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_mill_name_enum"`);
        await queryRunner.query(`ALTER TABLE "millComponents" DROP COLUMN "template_id"`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "sugar_cane_mill_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_component_type_enum" AS ENUM('Bronce', 'Corona')`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD "component_type" "public"."millComponents_component_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "FK_1f60b470b2686700e324cd62c98" FOREIGN KEY ("sugar_cane_mill_id") REFERENCES "sugarCaneMills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
