import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicViewRendererComponent } from './dynamic-view-renderer.component';

describe('DynamicViewRenderer', () => {
  let component: DynamicViewRendererComponent;
  let fixture: ComponentFixture<DynamicViewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicViewRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicViewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
