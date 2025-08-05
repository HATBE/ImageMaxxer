import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImageService } from '../../services/SharedImageService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css',
})
export class EditPageComponent {
  protected previewImage: string | null = null;

  public constructor(private router: Router, private sharedImageService: SharedImageService) {}

  public ngOnInit(): void {
    const image = this.sharedImageService.getFile();

    if (!image) {
      this.router.navigate(['/upload']);
    }

    this.previewImage = image ? URL.createObjectURL(image) : null;
  }
}
