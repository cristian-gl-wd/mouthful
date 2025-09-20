import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Firestore, collection, collectionData, limit, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface DataSourceConfig {
  collection: string;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  fetchData(dataSource: DataSourceConfig): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const dataCollection = collection(this.firestore, dataSource.collection);
      const q = query(dataCollection, limit(dataSource.limit || 10));

      return collectionData(q, { idField: 'id' }); 
    });
  }
}