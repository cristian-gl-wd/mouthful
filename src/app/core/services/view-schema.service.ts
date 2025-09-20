import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ViewNode {
  component: string;
  config?: any;
  dataSource?: any;
  children?: ViewNode[];
}

export interface ViewSchema {
  viewId: string;
  layout: ViewNode;
}

const FAKE_DASHBOARD_SCHEMA: ViewSchema = {
  viewId: 'dashboard-view',
  layout: {
    component: 'layout-main',
    children: [
      {
        component: 'primeng-card',
        config: {
          title: '¡Plataforma Mágica!',
          subtitle: 'Esta tarjeta se ha construido sola',
          content: 'Y la tabla de abajo se ha llenado con datos de Firestore. ¡Todo definido desde este JSON!'
        }
      },
      {
        component: 'data-table',
        config: {
          columns: [
            { field: 'name', header: 'Nombre' },
            { field: 'cuisine', header: 'Cocina' },
            { field: 'prepTime', header: 'Tiempo (min)' }
          ]
        },
        dataSource: {
          collection: 'recipes',
          limit: 5
        }
      }
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class ViewSchemaService {

  constructor() { }

  getViewSchema(viewId: string): Observable<ViewSchema | null> {
    if (viewId === 'dashboard-view') {
      return of(FAKE_DASHBOARD_SCHEMA);
    }
    return of(null);
  }
}