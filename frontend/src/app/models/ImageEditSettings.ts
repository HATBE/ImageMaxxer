import { AllowedImageConversionFormats } from './AllowedImageConversionFormats';

export default interface ImageEditSettings {
  format: AllowedImageConversionFormats | null;
  width: number | null;
  height: number | null;
  //upscale: boolean;
  aspectRatio: string | null;
  fillColor: string | null;
  rotate: number | null;
  flipHorizontal: boolean;
  flipVertical: boolean;
  border: {
    width: number | null;
    color: string | null;
  } | null;
  filters: {
    brightness: number | null;
    contrast: number | null;
    saturation: number | null;
    blur: number | null;
    sepia: number | null;
    grayscale: number | null;
    sharpen: number | null;
    invert: boolean | null;
  } | null;
  compressionQuality: number | null;
}
