import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditSettingsFormComponent } from './image-edit-settings-form.component';

describe('ImageEditSettingsFormComponent', () => {
  let component: ImageEditSettingsFormComponent;
  let fixture: ComponentFixture<ImageEditSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageEditSettingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageEditSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
