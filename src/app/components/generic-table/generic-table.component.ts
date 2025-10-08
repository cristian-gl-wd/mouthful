import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ViewDataService } from '../../core/renderer/view-data.service';
import { ViewNode } from '../../core/services/view-schema.service';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent {
  @Input() node!: ViewNode;

  private viewDataService = inject(ViewDataService);

  public data: Signal<any[]>;

  constructor() {
    this.data = computed(() => {
      const viewState = this.viewDataService.viewState();
      const dataKey = this.node.config?.['id'];
      return dataKey ? viewState[dataKey] || [] : [];
    });
  }
}
