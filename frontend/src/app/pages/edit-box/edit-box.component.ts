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

  protected onClickConvertToButton(format: ConversionFormats) {
    alert(format);
  }
}
