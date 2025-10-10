import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

import { CardConfig } from '../../../core/models/component-configs';
import { ChildrenRendererComponent } from '../../../core/renderer/children-renderer/children-renderer.component';
import { ViewNode } from '../../../core/services/view-schema.service';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [CardModule, ChildrenRendererComponent],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
})
export class GenericCardComponent {
  @Input() node!: ViewNode;

  get config(): CardConfig {
    return this.node.config as CardConfig;
  }
}
