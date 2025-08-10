import { fileTypeFromBuffer, FileTypeResult } from 'file-type';

export default class FileHelper {
  public static async detectMimeType(buffer: Buffer): Promise<FileTypeResult | undefined> {
    const fileType = await fileTypeFromBuffer(buffer);
    return fileType; // e.g., { ext: 'png', mime: 'image/png' }
  }
}
