import dotenv from 'dotenv';
import Server from './Server';
import AppRoute from './routes/AppRoute';
import { AppDataSource } from './lib/AppDataSource';

dotenv.config();

async function main(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Error during database setup:', error);
    process.exit(1);
  }

  const port = Number(process.env.API_PORT) || 3000;

  const appRoutes = new AppRoute().getRouter();

  const server = new Server(port, appRoutes);

  server.start();
}

main();
