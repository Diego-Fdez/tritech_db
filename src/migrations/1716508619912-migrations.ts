import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716508619912 implements MigrationInterface {
    name = 'Migrations1716508619912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."millComponents_component_type_enum" AS ENUM('Bronce', 'Corona')`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_component_name_enum" AS ENUM('Bronce 4ta maza LT', 'Bronce cañera LT', 'Bronce superior LT', 'Bronce bagacera LT', 'Bronce 4ta maza LS', 'Bronce cañera LS', 'Bronce superior LS', 'Bronce bagacera LS', 'Corona 4ta maza LT', 'Corona cañera LT', 'Corona superior LT', 'Corona bagacera LT', 'Corona 4ta maza LS', 'Corona cañera LS', 'Corona superior LS', 'Corona bagacera LS')`);
        await queryRunner.query(`CREATE TABLE "millComponents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sugar_cane_mill_id" character varying NOT NULL, "component_type" "public"."millComponents_component_type_enum" NOT NULL, "component_name" "public"."millComponents_component_name_enum" NOT NULL, CONSTRAINT "PK_b2b1f5d6e5c8f93afb0f4fda6b5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "millComponents"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_component_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_component_type_enum"`);
    }

}
