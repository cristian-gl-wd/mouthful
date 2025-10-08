import { Injectable, inject } from '@angular/core';
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

export interface DataSourceFilter {
  field: string;
  operator: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: any;
}

export interface DataSourceConfig {
  collection: string;
  limit?: number;
  orderBy?: string;
  filters?: DataSourceFilter[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore: Firestore = inject(Firestore);

  fetchData(config: DataSourceConfig): Observable<any[]> {
    const dataCollection = collection(this.firestore, config.collection);

    const constraints: QueryConstraint[] = [];

    if (config.limit) {
      constraints.push(limit(config.limit));
    }
    if (config.orderBy) {
      constraints.push(orderBy(config.orderBy));
    }
    if (config.filters) {
      config.filters.forEach((filter) => {
        constraints.push(where(filter.field, filter.operator, filter.value));
      });
    }

    const q = query(dataCollection, ...constraints);

    return collectionData(q, { idField: 'id' });
  }
}