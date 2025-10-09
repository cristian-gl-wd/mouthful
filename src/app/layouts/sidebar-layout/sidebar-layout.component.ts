import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenRendererComponent } from '../../core/renderer/children-renderer/children-renderer.component';
import { ViewNode } from '../../core/services/view-schema.service';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [CommonModule, ChildrenRendererComponent],
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss'],
})
export class SidebarLayoutComponent {
  @Input() node!: ViewNode;

  get sidebarWidth() {
    return this.node.config?.['sidebarWidth'] || '250px';
  }

  get sidebarChildren() {
    return this.node.children?.slice(0, 1) ?? [];
  }

  get mainChildren() {
    return this.node.children?.slice(1) ?? [];
  }
}
