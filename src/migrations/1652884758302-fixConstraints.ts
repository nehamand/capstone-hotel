import { MigrationInterface, QueryRunner } from "typeorm";

export class fixConstraints1652884758302 implements MigrationInterface {
    name = 'fixConstraints1652884758302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-17 13:25:48.102124'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "email" character varying NOT NULL`);
    }

}
