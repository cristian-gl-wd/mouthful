import { inject, Injectable } from '@angular/core';
import { doc, docData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ComponentConfig } from '../models/component-configs';

export type SchemaType = 'views' | 'layouts' | 'panels';

export interface ViewNode {
  component: string;
  config?: ComponentConfig;
  dataSource?: any;
  children?: ViewNode[];
  action?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ViewSchemaService {
  private firestore: Firestore = inject(Firestore);

  getViewSchema(
    schemaId: string,
    schemaType: SchemaType = 'views'
  ): Observable<ViewNode | undefined> {
    if (!schemaId) {
      return of(undefined);
    }
    const schemaDocRef = doc(
      this.firestore,
      `${schemaType}/${schemaId}`
    ) as DocumentReference<ViewNode>;
    return docData(schemaDocRef);
  }
}