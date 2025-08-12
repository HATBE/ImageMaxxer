export default interface ImageEditOptions {
  format: 'jpeg' | 'jpg' | 'png' | 'gif' | 'webp' | 'tiff' | 'avif' | null;
  resize: {
    width: number;
    height: number;
    fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    upscale: boolean;
  } | null;
  //aspectRatio: string | null; TODO: handler in frontend and jsutr give it as resize option
  fillColor: string | null;
  rotate: number | null;
  flipHorizontal: boolean;
  flipVertical: boolean;
  compressionQuality: number | null;
  border: {
    topWidth: number;
    bottomWidth: number;
    leftWidth: number;
    rightWidth: number;
    color: string;
  } | null;
  filters: {
    brightness: number | null;
    saturation: number | null;
    blur: number | null;
    grayscale: boolean;
    invert: boolean;
  } | null;
}
