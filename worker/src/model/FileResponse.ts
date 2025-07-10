import { Readable } from 'stream';

export interface FileResponse {
  stream: Readable;
  contentType?: string;
}
