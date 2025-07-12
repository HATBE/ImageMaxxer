import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AllowedImageConversionFormats } from '../../../models/AllowedImageConversionFormats';
import { ToggleRadioGridComponent } from '../../glob-forms/toggle-radio-grid/toggle-radio-grid.component';

@Component({
  selector: 'app-image-conversion-formpart',
  imports: [CommonModule, ToggleRadioGridComponent],
  templateUrl: './image-conversion-formpart.component.html',
  styleUrl: './image-conversion-formpart.component.css',
})
export class ImageConversionFormpartComponent {
  @Output() currentItem = new EventEmitter<string | null>();

  protected formatList: string[] = Object.values(AllowedImageConversionFormats);

  protected onCurrentItemChange(item: string | null): void {
    this.currentItem.emit(item);
  }
}
