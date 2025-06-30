import AbstractRoute from './AbstractRoute';
import ImageRoute from './ImageRoute';

export default class AppRoute extends AbstractRoute {
  protected registerRoutes(): void {
    this.getRouter().use('/image', new ImageRoute().getRouter());
  }
}
