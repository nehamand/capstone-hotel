import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1652918245403 implements MigrationInterface {
    name = 'initialMigration1652918245403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bedrooms" ("id" SERIAL NOT NULL, "number" character varying(4) NOT NULL, "floor" character varying(3) NOT NULL, "capacity" integer NOT NULL, "availability" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_90c8ad4889139688af6714d7890" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hired_services" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT 'now()', "end_date" TIMESTAMP NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "clientId" uuid, "serviceId" integer, CONSTRAINT "PK_c5edd533dcc220a1efed5357ef2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "cpf" character varying(11) NOT NULL, "birthDate" TIMESTAMP NOT NULL, "cellphone" character varying(11), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "bedroomId" integer, CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE ("cpf"), CONSTRAINT "UQ_71b55e261dba643eb6c0c94462a" UNIQUE ("cellphone"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "cpf" character varying(11) NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_0ac9216832e4dda06946c37cb73" UNIQUE ("cpf"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD CONSTRAINT "FK_e495a689d5fd0100356a2492a81" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD CONSTRAINT "FK_bd1d4bdccb10500c02d3f3f40fe" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_01bc17d52ad4dbbd52bebdf4dc7" FOREIGN KEY ("bedroomId") REFERENCES "bedrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO employees ("name", "password", "cpf", "admin") VALUES ('admin', '7898', '25632547898', true)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_01bc17d52ad4dbbd52bebdf4dc7"`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP CONSTRAINT "FK_bd1d4bdccb10500c02d3f3f40fe"`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP CONSTRAINT "FK_e495a689d5fd0100356a2492a81"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "hired_services"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "bedrooms"`);
    }

}
