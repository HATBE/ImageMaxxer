import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputPickerComponent } from './file-input-picker.component';

describe('FileInputPickerComponent', () => {
  let component: FileInputPickerComponent;
  let fixture: ComponentFixture<FileInputPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileInputPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
