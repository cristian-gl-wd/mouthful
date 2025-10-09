import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  QueryConstraint,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface DataSourceConfig {
  collection: string;
  limit?: number;
  orderBy?: string;
  filters?: {
    field: string;
    operator: '==' | '<' | '>' | '<=' | '>=' | 'in';
    value: any;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  fetchData(config: DataSourceConfig): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const dataCollection = collection(this.firestore, config.collection);
      const constraints: QueryConstraint[] = [];

      if (config.limit) {
        constraints.push(limit(config.limit));
      }
      if (config.orderBy) {
        const [field, direction] = config.orderBy.split(',');
        constraints.push(orderBy(field, direction === 'desc' ? 'desc' : 'asc'));
      }
      if (config.filters) {
        config.filters.forEach((filter) => {
          constraints.push(where(filter.field, filter.operator, filter.value));
        });
      }
      const q = query(dataCollection, ...constraints);
      return collectionData(q, { idField: 'id' });
    });
  }
}
