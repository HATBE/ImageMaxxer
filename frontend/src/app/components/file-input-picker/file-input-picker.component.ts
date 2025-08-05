import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-input-picker',
  imports: [CommonModule],
  templateUrl: './file-input-picker.component.html',
  styleUrl: './file-input-picker.component.css',
})
export class FileInputPickerComponent {
  @Output() onFileSelect = new EventEmitter<File>();

  @Input() infoMessage: string = '';
  @Input() allowedFileTypes: string = '*';

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const fileInputEvent = { target: { files } } as unknown as Event;
      this.onImagePicked(fileInputEvent);
    }
  }

  protected onImagePicked(fileUploadEventEvent: Event): void {
    const file = (fileUploadEventEvent.target as HTMLInputElement).files?.[0];

    if (!file) {
      return alert('no file available');
    }

    this.onFileSelect.emit(file);
  }
}
