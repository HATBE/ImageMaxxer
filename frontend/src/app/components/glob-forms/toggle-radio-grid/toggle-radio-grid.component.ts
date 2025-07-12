import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-radio-grid',
  imports: [CommonModule],
  templateUrl: './toggle-radio-grid.component.html',
  styleUrl: './toggle-radio-grid.component.css',
})
export class ToggleRadioGridComponent {
  @Input() items: string[] = [];
  @Output() currentItem = new EventEmitter<string | null>();

  // TODO: option for grid layout

  protected selectedItem: string | null = null;

  protected toggleSelection(item: string): void {
    this.selectedItem = this.selectedItem === item ? null : item;
    this.currentItem.emit(this.selectedItem);
  }
}
