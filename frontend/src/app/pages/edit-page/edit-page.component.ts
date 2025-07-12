import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { SpinnerSize } from '../../components/loading-spinner/SpinnerSize';
import { Image } from '../../models/Image';
import { ImageService } from '../../services/ImageService';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { ImageEditSettingsFormComponent } from '../../components/image-edit-settings-form/image-edit-settings-form.component';
import { SharedImageService } from '../../services/SharedImageService';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ImageEditSettingsFormComponent],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent implements OnInit {
  SpinnerSize = SpinnerSize;

  protected imageUrl: string | null = null;

  public constructor(
    private route: ActivatedRoute,
    private sharedImageService: SharedImageService
  ) {}

  public ngOnInit(): void {
    const image = this.sharedImageService.getFile();

    if (!image) {
      alert('No image file found in shared service.');
    }

    this.imageUrl = image ? URL.createObjectURL(image) : null;
  }
}
