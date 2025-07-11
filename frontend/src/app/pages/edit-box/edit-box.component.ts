import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConversionFormats } from '../../models/ConvertionFormats';

@Component({
  selector: 'app-edit-box',
  imports: [CommonModule, RouterModule],
  templateUrl: './edit-box.component.html',
  styleUrl: './edit-box.component.css',
})
export class EditBoxComponent {
  conversionFormats = ConversionFormats;

  formatList = ['JPG', 'PNG', 'GIF', 'WEBP', 'AVIF', 'TIFF', 'HEIF'];
  selectedFormat: string | null = null;

  toggleSelection(format: string): void {
    this.selectedFormat = this.selectedFormat === format ? null : format;
  }
}
