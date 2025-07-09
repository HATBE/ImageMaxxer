import 'reflect-metadata';
import { Container } from 'inversify';
import ImageController from '../controller/ImageController';
import ImageRoute from '../routes/ImageRoute';
import ImageUploader from '../image/ImageUploader';
import ImageService from '../services/ImageService';

const container = new Container();

const bindServices = () => {
  container.bind(ImageService).toSelf();
};

const bindControllers = () => {
  container.bind(ImageController).toSelf();
};

const bindRoutes = () => {
  container.bind(ImageRoute).toSelf();
};

const bindOther = () => {
  container.bind(ImageUploader).toSelf();
};

bindRoutes();
bindControllers();
bindServices();
bindOther();

export { container };
