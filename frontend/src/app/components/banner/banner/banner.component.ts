import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BannerType } from './BannerType';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  @Input() type: BannerType = BannerType.INFO;
  @Input() message: string = 'NO MESSAGE';

  protected title: string | null = null;
  protected alertCssClass: String = 'alert-primary';
  protected bsIcon: string = 'bi-info-circle-fill';
  protected textColor: string = 'text-dark';

  public ngOnInit() {
    switch (this.type) {
      case BannerType.ERROR:
        this.title = this.title || 'Error';
        this.alertCssClass = 'alert-danger';
        this.bsIcon = 'bi-info-circle-fill';
        break;
      case BannerType.SUCCESS:
        this.title = this.title || 'Success';
        this.alertCssClass = 'alert-success';
        this.bsIcon = 'bi-info-circle-fill';
        break;
      case BannerType.INFO:
        this.title = this.title || 'Info';
        this.alertCssClass = 'alert-info';
        this.bsIcon = 'bi-info-circle-fill';
        break;
      case BannerType.WARNING:
        this.title = this.title || 'Warning';
        this.alertCssClass = 'alert-warning';
        this.bsIcon = 'bi-info-circle-fill';
        break;
    }
  }
}
