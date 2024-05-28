import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716858265479 implements MigrationInterface {
    name = 'Migrations1716858265479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP CONSTRAINT "FK_b8f400b2a7fb1627b027993f7d3"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP CONSTRAINT "UQ_b8f400b2a7fb1627b027993f7d3"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD CONSTRAINT "FK_b8f400b2a7fb1627b027993f7d3" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" DROP CONSTRAINT "FK_b8f400b2a7fb1627b027993f7d3"`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD CONSTRAINT "UQ_b8f400b2a7fb1627b027993f7d3" UNIQUE ("template_id")`);
        await queryRunner.query(`ALTER TABLE "sugarCaneMills" ADD CONSTRAINT "FK_b8f400b2a7fb1627b027993f7d3" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
