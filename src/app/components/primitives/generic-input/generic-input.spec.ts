import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputComponent } from './generic-input.component';

describe('GenericInput', () => {
  let component: GenericInputComponent;
  let fixture: ComponentFixture<GenericInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
