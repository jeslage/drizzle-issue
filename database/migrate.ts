import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";

const connection = createConnection({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  connection.destroy();
};

main();
