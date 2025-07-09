import { injectable } from 'inversify';
import AbstractRoute from './AbstractRoute';
import ImageRoute from './ImageRoute';
import { container } from '../lib/inversify.config';

@injectable()
export default class AppRoute extends AbstractRoute {
  protected registerRoutes(): void {
    this.getRouter().use('/image', container.get(ImageRoute).getRouter());
  }
}
