"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.AppDataSource = process.env.NODE_ENV === "test"
    ? new typeorm_1.DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/models/*.ts"],
        synchronize: true,
    })
    : new typeorm_1.DataSource({
        type: "postgres",
        host: "localhost",
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: true,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        entities: process.env.NODE_ENV === "production"
            ? ["dist/src/models/*.js"]
            : ["src/models/*.ts"],
        migrations: process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.js"]
            : ["src/migrations/*.ts"],
    });
