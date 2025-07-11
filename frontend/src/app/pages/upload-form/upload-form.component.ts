import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageInputPickerComponent } from '../../components/file-input-picker/file-input-picker.component';
import { ImageService } from '../../services/ImageService';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { BannerComponent } from '../../components/banner/banner/banner.component';
import { BannerType } from '../../components/banner/BannerType';

@Component({
  selector: 'app-upload-form',
  imports: [CommonModule, ImageInputPickerComponent, BannerComponent],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css',
})
export class UploadFormComponent {
  protected BannerType = BannerType;

  protected allowedFileTypes: string[] = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/jpeg',
    'image/avif',
    'image/heif',
    'image/tiff',
    'image/tif',
    'image/jfif',
    'image/pjpeg',
    'image/pjp',
  ];

  protected error: string | null = null;

  protected selectedImage: File | null = null;
  protected previewImage: string | null = null;

  constructor(private imageService: ImageService) {}

  protected onImagePicked(file: File): void {
    this.selectedImage = file;

    if (!this.checkFileType(file)) {
      this.error = 'Invalid file type. Please select a valid image file.';
      this.resetPickedImage();
      return;
    }

    if (this.previewImage) {
      // clean up previous preview image to free memory
      URL.revokeObjectURL(this.previewImage);
    }
    // create base64 iamge preview url
    this.previewImage = URL.createObjectURL(file);

    this.error = null;
  }

  private resetPickedImage() {
    this.selectedImage = null;
    this.previewImage = null;
  }

  protected onChangeImageButtonPressed() {
    this.resetPickedImage();
  }

  protected onUploadImageButtonPressed() {
    const formData = new FormData();

    formData.append('image', this.selectedImage!);

    this.imageService
      .upload(formData)
      .then((response) => {
        console.log(response);
        alert('ok');
      })
      .catch((error: HttpErrorResponse) => {
        this.error =
          (error as HttpErrorResponse).error.message ||
          (error as HttpErrorResponse).message ||
          (error as HttpErrorResponse).statusText ||
          'Unknown error';
      });
  }

  private checkFileType(file: File): boolean {
    const fileType = file.type;
    return this.allowedFileTypes.includes(fileType.toLowerCase());
  }
}
