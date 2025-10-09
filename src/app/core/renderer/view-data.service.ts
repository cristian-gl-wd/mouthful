import { Injectable, inject, signal } from '@angular/core';
import { filter } from 'rxjs/operators';

import { ActionBusService, ActionEvent } from '../services/action-bus.service';
import { DataService } from '../services/data.service';
import { ViewNode } from '../services/view-schema.service';

@Injectable()
export class ViewDataService {
  private dataService = inject(DataService);
  private actionBus = inject(ActionBusService);

  viewState = signal<Record<string, any>>({});
  private currentSchema: ViewNode | null = null;

  constructor() {
    this.actionBus.actions$
      .pipe(filter((action: ActionEvent) => action.type === 'FILTER_CHANGED'))
      .subscribe((action: ActionEvent) => {
        if (this.currentSchema) {
          this.loadDataForView(this.currentSchema, action.payload);
        }
      });
  }

  loadDataForView(schema: ViewNode, filters: any = {}): void {
    this.currentSchema = schema;
    this.walkNode(schema, (node: ViewNode) => {
      if (node.dataSource && node.config?.['id']) {
        const dataKey = node.config['id'];

        const dynamicDataSource = { ...node.dataSource };
        if (filters.cuisine && filters.cuisine.length > 0) {
          dynamicDataSource.filters = [
            { field: 'cuisine', operator: 'in', value: filters.cuisine },
          ];
        }

        this.dataService.fetchData(dynamicDataSource).subscribe((data: any[]) => {
          this.viewState.update((current) => ({ ...current, [dataKey]: data }));
        });
      }
    });
  }

  private walkNode(node: ViewNode, callback: (node: ViewNode) => void): void {
    callback(node);
    if (node.children) {
      node.children.forEach((child) => this.walkNode(child, callback));
    }
  }
}
