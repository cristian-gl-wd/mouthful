import { Component, Input } from '@angular/core';
import { ChildrenRendererComponent } from '../../core/renderer/children-renderer/children-renderer.component';
import { ViewNode } from '../../core/services/view-schema.service';

@Component({
  selector: 'app-grid-layout',
  standalone: true,
  imports: [ChildrenRendererComponent],
  templateUrl: './grid-layout.component.html',
  styleUrl: './grid-layout.component.scss',
})
export class GridLayoutComponent {
  @Input() node!: ViewNode;

  get columns(): string {
    return this.node.config?.['columns'] || '1fr';
  }
}