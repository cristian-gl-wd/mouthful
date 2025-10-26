import { Component, computed, inject, Input, Signal } from '@angular/core';

import { ChildrenRendererComponent } from '../../../core/renderer/children-renderer/children-renderer.component';
import { ViewDataService } from '../../../core/renderer/view-data.service';
import { ViewNode } from '../../../core/services/view-schema.service';

@Component({
  imports: [ChildrenRendererComponent],
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent {
  @Input() node!: ViewNode;
  private viewDataService = inject(ViewDataService);

  data: Signal<any[]>;

  get itemComponent() {
    return this.node.config?.['itemComponent'];
  }

  constructor() {
    this.data = computed(() => {
      const viewState = this.viewDataService.viewState();
      const dataKey = this.node.config?.['id'];
      return dataKey ? viewState[dataKey] || [] : [];
    });
  }
}
