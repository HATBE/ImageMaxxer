import ImageEditOptions from './ImageEditOptions';

export default interface QueueImageMessage {
  id: string;
  timestamp: number;
  options: ImageEditOptions;
  path: string;
}
