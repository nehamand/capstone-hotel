import { MigrationInterface, QueryRunner } from "typeorm";

export class addBedroomNumberHiredService1652966739453 implements MigrationInterface {
    name = 'addBedroomNumberHiredService1652966739453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" ADD "bedroom_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-18 23:57:57.446167'`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "bedroom_number"`);
    }

}
