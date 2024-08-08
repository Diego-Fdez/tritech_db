import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723068799894 implements MigrationInterface {
    name = 'Migrations1723068799894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7"`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "response_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7"`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "response_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_08f038baecd54ecc69350a7a3d7" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
