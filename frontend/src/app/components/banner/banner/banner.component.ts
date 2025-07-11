import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerType } from '../BannerType';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  @Input() type: BannerType = BannerType.INFO;
  @Input() message: string = 'NO MESSAGE';

  protected title: string | null = null;
  protected borderColor: string = 'blue';
  protected textColor: string = 'black';

  public ngOnInit() {
    switch (this.type) {
      case BannerType.ERROR:
        this.title = this.title || 'Error';
        this.borderColor = 'border-red-400';
        this.textColor = 'text-red-400';
        break;
      case BannerType.SUCCESS:
        this.title = this.title || 'Success';
        this.borderColor = 'border-green-400';
        this.textColor = 'text-green-400';
        break;
      case BannerType.INFO:
        this.title = this.title || 'Info';
        this.borderColor = 'border-blue-400';
        this.textColor = 'text-blue-400';
        break;
    }
  }
}
