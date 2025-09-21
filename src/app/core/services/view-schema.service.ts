import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

const FAKE_DASHBOARD_SCHEMA: ViewSchema = {
  viewId: 'dashboard-view',
  layout: {
    component: 'layout-main',
    children: [
      {
        component: 'primeng-card',
        config: {
          title: 'Magic platform!',
          subtitle: 'This card has built itself from JSON',
          content:
            'And the table below has been populated with data from Firestore. All defined from this JSON!',
        },
      },
      {
        component: 'button',
        config: {
          label: 'Add new recipe',
          icon: 'pi pi-plus',
        },
        action: {
          type: 'navigate',
          payload: '/recipes/new',
        },
      },
      {
        component: 'data-table',
        config: {
          columns: [
            { field: 'name', header: 'Nombre' },
            { field: 'cuisine', header: 'Cocina' },
            { field: 'prepTime', header: 'Tiempo (min)' },
          ],
        },
        dataSource: {
          collection: 'recipes',
          limit: 5,
        },
      },
    ],
  },
};

const FAKE_FORM_SCHEMA: ViewSchema = {
  viewId: 'recipe-form-view',
  layout: {
    component: 'form-page-layout',
    children: [
      {
        component: 'primeng-card',
        config: {
          title: 'New recipe',
          subtitle: 'Complete the details to add a new recipe to the collection',
        },
      },
      {
        component: 'generic-form',
        action: {
          type: 'submit-form',
          payload: {
            collection: 'recipes',
            onSuccess: {
              type: 'navigate',
              payload: '/dashboard',
            },
          },
        },
        children: [
          {
            component: 'text-input',
            config: { name: 'name', label: 'Recipe name' },
          },
          {
            component: 'text-input',
            config: { name: 'cuisine', label: 'Origin' },
          },
          {
            component: 'text-input',
            config: { name: 'prepTime', label: 'Preparation time (min)', type: 'number' },
          },
          {
            component: 'button',
            config: { label: 'Save recipe', icon: 'pi pi-check', type: 'submit' },
          },
        ],
      },
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class ViewSchemaService {
  constructor() {}

  getViewSchema(viewId: string): Observable<ViewSchema | null> {
    if (viewId === 'dashboard-view') {
      return of(FAKE_DASHBOARD_SCHEMA);
    }
    if (viewId === 'recipe-form-view') {
      return of(FAKE_FORM_SCHEMA);
    }
    return of(null);
  }
}
