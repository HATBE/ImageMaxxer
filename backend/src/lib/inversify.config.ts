import 'reflect-metadata';
import { Container } from 'inversify';
import ImageController from '../controller/ImageController';
import ImageRoute from '../routes/ImageRoute';
import S3FileHandler from './S3FileHandler';
import ImageService from '../services/ImageService';
import ImageRepository from '../repositories/ImageRepository';
import UserRepository from '../repositories/UserRepository';
import ImageProcessingRepository from '../repositories/ImageProcessingRepository';

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

const bindRepositories = () => {
  container.bind(ImageRepository).toSelf();
  container.bind(UserRepository).toSelf();
  container.bind(ImageProcessingRepository).toSelf();
};

const bindOther = () => {
  container.bind(S3FileHandler).toSelf();
};

bindRoutes();
bindRepositories();
bindControllers();
bindServices();

bindOther();

export { container };
