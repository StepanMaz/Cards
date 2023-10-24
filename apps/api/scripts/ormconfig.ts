import { DataSource } from "typeorm";
import { migration_config } from "../src/typeorm.config";

export default new DataSource(migration_config);
