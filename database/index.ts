import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";

import * as schema from "./schema";

const connection = createConnection({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection, {
  schema,
  mode: "default",
});

export default db;
