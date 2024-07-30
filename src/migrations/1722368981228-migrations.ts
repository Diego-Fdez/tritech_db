import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722368981228 implements MigrationInterface {
    name = 'Migrations1722368981228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" ALTER COLUMN "description" SET NOT NULL`);
    }

}
