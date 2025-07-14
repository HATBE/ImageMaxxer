import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizeFormpartComponent } from './image-resize-formpart.component';

describe('ImageResizeFormpartComponent', () => {
  let component: ImageResizeFormpartComponent;
  let fixture: ComponentFixture<ImageResizeFormpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageResizeFormpartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageResizeFormpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
