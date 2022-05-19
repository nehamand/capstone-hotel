import { MigrationInterface, QueryRunner } from "typeorm";

export class addBedroomNumberHiredService1652967240353 implements MigrationInterface {
    name = 'addBedroomNumberHiredService1652967240353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "bedroom_number"`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD "bedroom_number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "bedroom_number"`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD "bedroom_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-19 13:27:16.761992'`);
    }

}
