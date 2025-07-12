import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageConversionFormpartComponent } from './image-conversion-formpart/image-conversion-formpart.component';

@Component({
  selector: 'app-image-edit-settings-form',
  imports: [CommonModule, RouterModule, ImageConversionFormpartComponent],
  templateUrl: './image-edit-settings-form.component.html',
  styleUrl: './image-edit-settings-form.component.css',
})
export class ImageEditSettingsFormComponent {
  private formatConversion: string | null = null;

  protected onFormatChange(format: string | null): void {
    this.formatConversion = format;
  }

  protected onProccessImageButtonClicked(): void {
    console.log(this.formatConversion);
  }
}
