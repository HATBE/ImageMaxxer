import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import User from '../models/User';
import { Image } from '../models/Image';
import ImageProcessing from '../models/ImageProcessing';
import ImageProcessingState from '../models/ImageProcessingStates';
dotenv.config();

const isTrue = (v?: string) => String(v).toLowerCase() === 'true';

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as any) || 'mariadb', // use 'mariadb' not 'mysql'
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || 'dbuser',
  password: process.env.DB_PASS || 'apppass',
  database: process.env.DB_NAME || 'db',
  // dev only; use migrations for prod:
  synchronize: isTrue(process.env.DB_SYNC) ?? true,
  logging: isTrue(process.env.DB_LOGGING),
  // point to your entities (ts for dev, js for prod build)
  entities: [User, Image, ImageProcessing, ImageProcessingState],
  migrations: ['src/migration/**/*.ts'],
  // sensible MariaDB defaults
  charset: 'utf8mb4',
  timezone: 'Z', // store in UTC
});
