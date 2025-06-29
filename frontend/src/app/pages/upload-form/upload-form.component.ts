import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageInputPickerComponent } from '../../components/file-input-picker/file-input-picker.component';

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
    // TODO: uplaod to server
  }
}
