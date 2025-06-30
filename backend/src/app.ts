import dotenv from 'dotenv';
import Server from './Server';
import AppRoute from './routes/AppRoute';

dotenv.config();

async function main(): Promise<void> {
  const port = Number(process.env.API_PORT) || 3000;

  const appRoutes = new AppRoute().getRouter();

  const server = new Server(port, appRoutes);

  server.start();
}

main();
