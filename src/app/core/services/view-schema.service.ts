import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ViewNode {
  component: string;
  config?: any;
  dataSource?: any;
  children?: ViewNode[];
  action?: any;
}

export interface ViewSchema {
  viewId: string;
  layout: ViewNode;
}


@Injectable({
  providedIn: 'root',
})
export class ViewSchemaService {
  private firestore: Firestore = inject(Firestore);

  getViewSchema(viewId: string): Observable<ViewNode | null> {
    const docRef = doc(this.firestore, `view-schemas/${viewId}`);
    return docData(docRef, { idField: 'viewId' }) as Observable<ViewNode | null>;
  }
}