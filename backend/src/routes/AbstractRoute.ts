import express from 'express';

export default abstract class AbstractRoute {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected abstract registerRoutes(): void;

  public getRouter(): express.Router {
    return this.router;
  }
}
