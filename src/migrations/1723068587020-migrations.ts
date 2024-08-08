import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723068587020 implements MigrationInterface {
    name = 'Migrations1723068587020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temperatureData" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mill_component_id" uuid NOT NULL, "temperature" integer NOT NULL, "temperature_id" uuid NOT NULL, CONSTRAINT "PK_0bf248a583f51a0ecdb95544f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_name" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_22f7e5f9138149a624c88dfcc84" UNIQUE ("client_name"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "form_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_be3bdac59bd243dff421ad7bf70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."answer_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "answer_value" character varying NOT NULL, "question_id" uuid NOT NULL, "status" "public"."answer_status_enum" NOT NULL DEFAULT 'active', "response_id" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."answerOptions_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "answerOptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "option_text" character varying NOT NULL, "question_id" uuid NOT NULL, "status" "public"."answerOptions_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "PK_bf59858c998e89aedbcbb8febd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."question_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type_question" character varying NOT NULL, "text_question" character varying NOT NULL, "order" integer NOT NULL, "form_id" uuid NOT NULL, "status" "public"."question_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."form_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "form" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "client_id" uuid NOT NULL, "created_by_id" uuid NOT NULL, "status" "public"."form_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'CREATOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'BASIC', "country" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."templates_template_type_enum" AS ENUM('TB', 'TT', 'II', 'CH')`);
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid NOT NULL, "template_name" character varying NOT NULL, "created_by" uuid NOT NULL, "status" character varying NOT NULL DEFAULT 'incomplete', "template_type" "public"."templates_template_type_enum" NOT NULL, CONSTRAINT "UQ_2e57e166b6dba51bee97a31c509" UNIQUE ("template_name"), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_mill_name_enum" AS ENUM('Molino 1', 'Molino 2', 'Molino 3', 'Molino 4', 'Molino 5', 'Molino 6')`);
        await queryRunner.query(`CREATE TYPE "public"."millComponents_component_name_enum" AS ENUM('Bronce 4ta maza LT', 'Bronce cañera LT', 'Bronce superior LT', 'Bronce bagacera LT', 'Bronce 4ta maza LS', 'Bronce cañera LS', 'Bronce superior LS', 'Bronce bagacera LS', 'Corona 4ta maza LT', 'Corona cañera LT', 'Corona superior LT', 'Corona bagacera LT', 'Corona 4ta maza LS', 'Corona cañera LS', 'Corona superior LS', 'Corona bagacera LS')`);
        await queryRunner.query(`CREATE TABLE "millComponents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "template_id" uuid NOT NULL, "mill_name" "public"."millComponents_mill_name_enum" NOT NULL, "component_name" "public"."millComponents_component_name_enum" NOT NULL, "tandem_number" integer NOT NULL, CONSTRAINT "PK_b2b1f5d6e5c8f93afb0f4fda6b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "temperatureData" ADD CONSTRAINT "FK_7ea304ed977294a6e046228fdd8" FOREIGN KEY ("mill_component_id") REFERENCES "millComponents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answerOptions" ADD CONSTRAINT "FK_cf0808f8c293fc1952afcb34178" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4c7564021a60d15e709c4760a91" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_efcb3a58fefe737ab133492ae69" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_e0753fa8d20f4eae08ebec1fef9" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_876c197c0b264bef7a494c80fb0" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "millComponents" ADD CONSTRAINT "FK_a15bd7c2472d6f3c542bcd1593b" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "millComponents" DROP CONSTRAINT "FK_a15bd7c2472d6f3c542bcd1593b"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_876c197c0b264bef7a494c80fb0"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_e0753fa8d20f4eae08ebec1fef9"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_efcb3a58fefe737ab133492ae69"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_c9699f823ef2f3b1b279d1322a6"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4c7564021a60d15e709c4760a91"`);
        await queryRunner.query(`ALTER TABLE "answerOptions" DROP CONSTRAINT "FK_cf0808f8c293fc1952afcb34178"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_330293fd20922a5d97a4ba02a4c"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_b3e219038bc78f6c3441c5a9a96"`);
        await queryRunner.query(`ALTER TABLE "temperatureData" DROP CONSTRAINT "FK_7ea304ed977294a6e046228fdd8"`);
        await queryRunner.query(`DROP TABLE "millComponents"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_component_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."millComponents_mill_name_enum"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TYPE "public"."templates_template_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TYPE "public"."form_status_enum"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_status_enum"`);
        await queryRunner.query(`DROP TABLE "answerOptions"`);
        await queryRunner.query(`DROP TYPE "public"."answerOptions_status_enum"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TYPE "public"."answer_status_enum"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "temperatureData"`);
    }

}
