import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { SpinnerSize } from '../../components/loading-spinner/SpinnerSize';
import { Image } from '../../models/Image';
import { ImageService } from '../../services/ImageService';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent implements OnInit {
  SpinnerSize = SpinnerSize;

  protected formatList = ['JPG', 'PNG', 'GIF', 'WEBP', 'AVIF', 'TIFF', 'HEIF'];
  protected selectedFormat: string | null = null;

  protected id: string | null = null;
  protected image: Image | null = null;
  protected imageUrl: string | null = null;

  protected error: string | null = null;
  protected isLoading = true;

  public constructor(private route: ActivatedRoute, private imageService: ImageService) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.loadImage();
    });
  }

  protected toggleSelection(format: string): void {
    this.selectedFormat = this.selectedFormat === format ? null : format;
  }

  private setError(message: string): void {
    this.isLoading = false;
    this.error = message;
  }

  private async loadImage(): Promise<void> {
    this.isLoading = true;

    try {
      const response = await this.imageService.getById(this.id!);

      this.image = response.data;

      this.imageUrl = `http://localhost:3000/api/v1/image/${this.image.id}`;

      this.isLoading = false;
    } catch (error) {
      return this.setError(
        (error as HttpErrorResponse).error.message ||
          (error as HttpErrorResponse).message ||
          (error as HttpErrorResponse).statusText ||
          'Unknown error'
      );
    }
  }
}
