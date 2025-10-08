import { Component, Input } from '@angular/core';
import { DynamicComponentDirective } from '../dynamic-component.directive';
import { ViewNode } from '../../services/view-schema.service';

@Component({
  selector: 'app-children-renderer',
  standalone: true,
  imports: [DynamicComponentDirective],
  template: `
    @for (child of children; track child) {
      <ng-container [appDynamicComponent]="child"></ng-container>
    }
  `,
})
export class ChildrenRendererComponent {
  @Input() children: ViewNode[] = [];
}