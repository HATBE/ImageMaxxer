import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImageService } from '../../services/SharedImageService';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner/banner.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ImageEditOptions from '../../models/ImageEditOptions';
import { BannerType } from '../../components/banner/banner/BannerType';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule, BannerComponent, ReactiveFormsModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent {
  protected previewImage: string | null = null;
  protected BannerType = BannerType;
  protected isLoading: boolean = false;

  protected editForm: FormGroup;

  protected error: string | null = null;
  protected success: string | null = null;

  public constructor(
    private router: Router,
    private sharedImageService: SharedImageService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      format: ['-1'],
      quality: [90, [Validators.min(1), Validators.max(100)]],
      resizeWidth: [null],
      resizeHeight: [null],
      fit: ['contain'],
      rotate: [0],
      flipHorizontal: [false],
      flipVertical: [false],
      fillColor: ['#000000'],
      borderColor: ['#000000'],
      borderTop: [0, [Validators.min(0)]],
      borderRight: [0, [Validators.min(0)]],
      borderBottom: [0, [Validators.min(0)]],
      borderLeft: [0, [Validators.min(0)]],
      aspectRatio: ['-1'],
      brightness: [1, [Validators.min(0), Validators.max(3)]],
      saturation: [1, [Validators.min(0), Validators.max(3)]],
      blur: [0, [Validators.min(0), Validators.max(10)]],
      grayscale: [false],
      invert: [false],
    });
  }

  public ngOnInit(): void {
    const image = this.sharedImageService.getFile();

    if (!image) {
      this.router.navigate(['/upload']);
    }

    this.previewImage = image ? URL.createObjectURL(image) : null;
  }

  protected onSubmit() {
    if (this.editForm.invalid) {
      this.setError('Form Invalid');
      return;
    }

    const val = this.editForm.value;

    const editOptions: ImageEditOptions = {
      format: val.format === '-1' ? null : val.format,
      compressionQuality: val.quality ?? null,
      resize: {
        width: val.resizeWidth ?? 0,
        height: val.resizeHeight ?? 0,
        fit: val.fit,
        upscale: false, // optional logic
      },
      fillColor: val.fillColor,
      rotate: val.rotate,
      flipHorizontal: val.flipHorizontal,
      flipVertical: val.flipVertical,
      border: {
        topWidth: val.borderTop,
        rightWidth: val.borderRight,
        bottomWidth: val.borderBottom,
        leftWidth: val.borderLeft,
        color: val.borderColor,
      },
      filters: {
        brightness: val.brightness,
        saturation: val.saturation,
        blur: val.blur,
        grayscale: val.grayscale,
        invert: val.invert,
      },
    };

    this.setError('TEST');

    // handle image processing here
  }

  private setError(message: string): void {
    this.isLoading = false;
    this.error = message;
  }

  private setSuccess(message: string): void {
    this.isLoading = false;
    this.success = message;
  }
}
