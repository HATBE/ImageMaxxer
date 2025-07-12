import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageConversionFormpartComponent } from './image-conversion-formpart.component';

describe('ImageConversionFormpartComponent', () => {
  let component: ImageConversionFormpartComponent;
  let fixture: ComponentFixture<ImageConversionFormpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageConversionFormpartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageConversionFormpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
