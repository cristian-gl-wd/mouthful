import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';

import { ActionBusService } from '../../../core/services/action-bus.service';
import { ViewNode } from '../../../core/services/view-schema.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, DividerModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  @Input() node!: ViewNode;
  private actionBus = inject(ActionBusService);

  selectedFilters: { [key: string]: any[] } = {};

  onFilterChange(): void {
    this.actionBus.dispatch({
      type: 'FILTER_CHANGED',
      payload: this.selectedFilters,
    });
  }
}
