import { MigrationInterface, QueryRunner } from "typeorm";

export class droppingColumnEmail1652898662225 implements MigrationInterface {
    name = 'droppingColumnEmail1652898662225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-18 17:59:49.253403'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "email" character varying NOT NULL`);
    }

}
