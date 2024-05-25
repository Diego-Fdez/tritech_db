import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716658139168 implements MigrationInterface {
    name = 'Migrations1716658139168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'CREATOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "web" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'BASIC', "phone" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_name" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_22f7e5f9138149a624c88dfcc84" UNIQUE ("client_name"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid NOT NULL, "template_name" character varying NOT NULL, "created_by" uuid NOT NULL, CONSTRAINT "REL_876c197c0b264bef7a494c80fb" UNIQUE ("client_id"), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "temperatureData" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mill_component_id" character varying NOT NULL, "temperature" integer NOT NULL, "date" TIMESTAMP NOT NULL, "details" character varying, CONSTRAINT "PK_0bf248a583f51a0ecdb95544f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sugarCaneMills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tandem_count" integer NOT NULL, "mill_name" character varying NOT NULL, "template_id" character varying NOT NULL, CONSTRAINT "PK_e7d2f04bc097bfb9c1504d3a01f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_component_type_enum" AS ENUM('Bronce', 'Corona')`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_component_name_enum" AS ENUM('Bronce 4ta maza LT', 'Bronce cañera LT', 'Bronce superior LT', 'Bronce bagacera LT', 'Bronce 4ta maza LS', 'Bronce cañera LS', 'Bronce superior LS', 'Bronce bagacera LS', 'Corona 4ta maza LT', 'Corona cañera LT', 'Corona superior LT', 'Corona bagacera LT', 'Corona 4ta maza LS', 'Corona cañera LS', 'Corona superior LS', 'Corona bagacera LS')`);
        await queryRunner.query(`CREATE TABLE "millComponents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sugar_cane_mill_id" character varying NOT NULL, "component_type" "public"."millComponents_component_type_enum" NOT NULL, "component_name" "public"."millComponents_component_name_enum" NOT NULL, CONSTRAINT "PK_b2b1f5d6e5c8f93afb0f4fda6b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_e0753fa8d20f4eae08ebec1fef9" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_876c197c0b264bef7a494c80fb0" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_876c197c0b264bef7a494c80fb0"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_e0753fa8d20f4eae08ebec1fef9"`);
        await queryRunner.query(`DROP TABLE "millComponents"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_component_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_component_type_enum"`);
        await queryRunner.query(`DROP TABLE "sugarCaneMills"`);
        await queryRunner.query(`DROP TABLE "temperatureData"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
