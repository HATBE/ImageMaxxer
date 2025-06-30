import { type Server as ServerHttp, type IncomingMessage, type ServerResponse } from 'http';
import express, { Express, Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error-handler';

export default class Server {
  private app: Express;
  private serverListener?: ServerHttp<typeof IncomingMessage, typeof ServerResponse>;
  private port: number;
  private readonly routes: Router;

  constructor(port: number, routes: Router) {
    this.port = port;
    this.routes = routes;

    this.app = express();
  }

  start(): void {
    // Middleware
    this.app.use(express.json()); // parse json in request body (allow raw)
    this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
    this.app.use(cookieParser());

    // CORS
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        origin: process.env.URL_FRONTEND || 'https://localhost',
        credentials: true, // Allow credentials (cookies) to be sent
      })
    );

    // API rate limiter
    this.app.use(
      rateLimit({
        max: Number(process.env.RATE_LIMIT_MAX) || 100,
        windowMs: (Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000, // value in mins
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          status: false,
          message: 'Too many requests, please try again later.',
        },
      })
    );

    this.app.enable('trust proxy'); // if a reverse proxy is in use, this way the real IP of the user is in the ip not the proxies

    // HTTP logger
    this.app.use(morgan('common'));

    this.app.all('/', (req: Request, res: Response) => {
      res.status(200).json({
        status: true,
        message: `Wilkommen zu der ${
          process.env.APP_NAME || 'my app'
        } API. Bitte lese die Dokumentation oder nutze das frontend:
		 ${process.env.URL_FRONTEND || req.hostname}`,
      });
    });

    // Routes
    this.app.use('/api/v1', this.routes);

    // default route -> if no other match (404 route)
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: false,
        message: 'Diese API Route wurde nicht gefunden, bitte lese die Dokumentation.',
      });
    });

    this.app.use(errorHandler);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(
        `[INIT] [INFO] ${process.env.APP_NAME || 'my app'} has started on port ${this.port}.`
      );
    });
  }

  close(): void {
    this.serverListener?.close();
  }
}
