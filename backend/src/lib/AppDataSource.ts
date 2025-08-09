import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // hydration
  logging: true, //process.env.PROD === '0', // just log in dev mode
  entities: [],
  subscribers: [],
  migrations: ['src/migration/**/*.ts'],
});
