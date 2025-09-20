import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicViewRenderer } from './dynamic-view-renderer.component';

describe('DynamicViewRenderer', () => {
  let component: DynamicViewRenderer;
  let fixture: ComponentFixture<DynamicViewRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicViewRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicViewRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
