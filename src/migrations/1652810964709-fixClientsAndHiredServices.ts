import { MigrationInterface, QueryRunner } from "typeorm";

export class fixClientsAndHiredServices1652810964709 implements MigrationInterface {
    name = 'fixClientsAndHiredServices1652810964709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" DROP CONSTRAINT "UQ_419c177cee578ebc985d81a2f7e"`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "cellphone"`);
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-17 17:11:21.349902'`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD "cellphone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD CONSTRAINT "UQ_419c177cee578ebc985d81a2f7e" UNIQUE ("cellphone")`);
    }

}
