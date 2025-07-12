import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleRadioGridComponent } from './toggle-radio-grid.component';

describe('ToggleRadioGridComponent', () => {
  let component: ToggleRadioGridComponent;
  let fixture: ComponentFixture<ToggleRadioGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleRadioGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleRadioGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
