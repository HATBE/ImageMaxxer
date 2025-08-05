import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedImageService } from '../../services/SharedImageService';
import { Router } from '@angular/router';
import { BannerType } from '../../components/banner/banner/BannerType';
import { FileInputPickerComponent } from '../../components/file-input-picker/file-input-picker.component';
import { BannerComponent } from '../../components/banner/banner/banner.component';

@Component({
  selector: 'app-upload-page',
  imports: [CommonModule, FileInputPickerComponent, BannerComponent],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css',
})
export class UploadPageComponent {
  BannerType = BannerType;

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
  protected success: string | null = null;

  protected selectedImage: File | null = null;
  protected previewImage: string | null = null;

  constructor(private sharedImageService: SharedImageService, private router: Router) {}

  protected onImagePicked(file: File): void {
    this.selectedImage = file;

    if (!this.checkFileType(file)) {
      this.error = 'Invalid filetype. Please select a valid image file.';
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
    this.error = null;
    this.resetPickedImage();
  }

  protected onUploadImageButtonPressed() {
    if (!this.selectedImage) {
      this.error = 'No image selected. Please select an image to upload.';
      return;
    }

    this.error = null;
    this.sharedImageService.setFile(this.selectedImage);
    this.success = 'Successfully uploaded image. Redirecting to edit page...';
    this.router.navigate(['/edit']);
  }

  private checkFileType(file: File): boolean {
    const fileType = file.type;
    return this.allowedFileTypes.includes(fileType.toLowerCase());
  }
}
