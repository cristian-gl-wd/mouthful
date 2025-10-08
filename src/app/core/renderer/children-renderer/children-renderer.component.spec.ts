import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenRendererComponent } from './children-renderer.component';

describe('ChildrenRendererComponent', () => {
  let component: ChildrenRendererComponent;
  let fixture: ComponentFixture<ChildrenRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrenRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildrenRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
