import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1652793773315 implements MigrationInterface {
    name = 'migrations1652793773315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hired_services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL DEFAULT 'now()', "end_date" TIMESTAMP NOT NULL, "cellphone" character varying NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "clientsId" uuid, "servicesId" uuid, CONSTRAINT "UQ_419c177cee578ebc985d81a2f7e" UNIQUE ("cellphone"), CONSTRAINT "PK_c5edd533dcc220a1efed5357ef2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying NOT NULL, "cpf" character varying(11) NOT NULL, "birthDate" TIMESTAMP NOT NULL, "cellphone" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "bedroomId" uuid, CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE ("cpf"), CONSTRAINT "UQ_71b55e261dba643eb6c0c94462a" UNIQUE ("cellphone"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bedrooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying(4) NOT NULL, "floor" character varying(3) NOT NULL, "capacity" integer NOT NULL, "availability" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_90c8ad4889139688af6714d7890" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "cpf" character varying(11) NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_0ac9216832e4dda06946c37cb73" UNIQUE ("cpf"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD CONSTRAINT "FK_454587af462a1cb1021823b94ed" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hired_services" ADD CONSTRAINT "FK_4e08f385f941f8803f5508717df" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_01bc17d52ad4dbbd52bebdf4dc7" FOREIGN KEY ("bedroomId") REFERENCES "bedrooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_01bc17d52ad4dbbd52bebdf4dc7"`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP CONSTRAINT "FK_4e08f385f941f8803f5508717df"`);
        await queryRunner.query(`ALTER TABLE "hired_services" DROP CONSTRAINT "FK_454587af462a1cb1021823b94ed"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "bedrooms"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "hired_services"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
