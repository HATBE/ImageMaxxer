import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SpinnerSize } from './SpinnerSize';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() size: SpinnerSize = SpinnerSize.LARGE;
  @Input() center: boolean = false;

  protected height: string = `h-${this.size}`;
  protected width: string = `h-${this.size}`;

  public ngOnInit(): void {
    this.height = `h-${this.size}`;
    this.width = `w-${this.size}`;
  }
}
