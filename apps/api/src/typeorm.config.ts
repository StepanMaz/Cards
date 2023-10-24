import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DataSourceOptions } from "typeorm";
import { join } from "path";

require("dotenv").config();
export const migration_config: DataSourceOptions = {
    type: "postgres",
    migrationsTableName: "migrations",

    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT!,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    migrations: ["dist/migrations/*.{ts,js}"],
    entities: [User],
};

const additionals: Partial<TypeOrmModuleOptions> = {};
export const app_config: TypeOrmModuleOptions = Object.assign(
    additionals,
    migration_config,
);
