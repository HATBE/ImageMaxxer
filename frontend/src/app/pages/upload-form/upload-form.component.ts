import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageInputPickerComponent } from '../../components/file-input-picker/file-input-picker.component';
import { ImageService } from '../../services/ImageService';
import { AllowedFormats } from '../../models/AllowedFormats';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

@Component({
  selector: 'app-upload-form',
  imports: [CommonModule, ImageInputPickerComponent],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css',
})
export class UploadFormComponent {
  protected error: string | null = null;

  protected selectedImage: File | null = null;
  protected previewImage: string | null = null;

  constructor(private imageService: ImageService) {}

  protected onImagePicked(file: File): void {
    this.selectedImage = file;
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
        console.log(
          (error as HttpErrorResponse).error.message ||
            (error as HttpErrorResponse).message ||
            (error as HttpErrorResponse).statusText ||
            'Unknown error'
        );
      });
  }
}
