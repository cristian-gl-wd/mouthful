import { Injectable, signal, WritableSignal } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { ViewNode } from '../services/view-schema.service';

@Injectable()
export class ViewDataService {
  public viewState: WritableSignal<Record<string, any>> = signal({});

  constructor(private dataService: DataService) {}

  loadDataForView(schema: ViewNode): void {
    const dataSourcesToFetch: Record<string, Observable<any[]>> = {};

    const findDataSources = (node: ViewNode) => {
      if (node.dataSource && node.config?.['id']) {
        dataSourcesToFetch[node.config['id']] = this.dataService.fetchData(node.dataSource);
      }
      if (node.children) {
        node.children.forEach((child) => findDataSources(child));
      }
    };

    findDataSources(schema);

    if (Object.keys(dataSourcesToFetch).length > 0) {
      forkJoin(dataSourcesToFetch).subscribe((results) => {
        this.viewState.set(results);
      });
    }
  }
}