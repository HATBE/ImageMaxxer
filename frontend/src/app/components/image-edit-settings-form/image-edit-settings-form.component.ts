import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { AllowedImageConversionFormats } from '../../models/AllowedImageConversionFormats';

@Component({
  selector: 'app-image-edit-settings-form',
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './image-edit-settings-form.component.html',
  styleUrl: './image-edit-settings-form.component.css',
})
export class ImageEditSettingsFormComponent {
  protected formatList: string[] = Object.values(AllowedImageConversionFormats);

  protected selectedFormat: string | null = null;

  protected toggleSelection(format: string): void {
    this.selectedFormat = this.selectedFormat === format ? null : format;
  }
}
