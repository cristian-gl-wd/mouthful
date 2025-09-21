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
          title: '¡Plataforma Mágica!',
          subtitle: 'Esta tarjeta se ha construido sola',
          content: 'Y la tabla de abajo se ha llenado con datos de Firestore. ¡Todo definido desde este JSON!'
        }
      },
      {
        component: 'button',
        config: {
          label: 'Añadir Nueva Receta',
          icon: 'pi pi-plus'
        },
        action: {
          type: 'navigate',
          payload: '/recipes/new'
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

const FAKE_FORM_SCHEMA: ViewSchema = {
  viewId: 'recipe-form-view',
  layout: {
    component: 'form-layout',
    children: [
      {
        component: 'primeng-card',
        config: {
          title: 'Nueva Receta',
          subtitle: 'Rellena los datos para añadir una nueva receta a la colección.'
        }
      },
      {
        component: 'text-input',
        config: {
          name: 'name',
          label: 'Nombre de la Receta'
        }
      },
      {
        component: 'text-input',
        config: {
          name: 'cuisine',
          label: 'Tipo de Cocina'
        }
      },
      {
        component: 'text-input',
        config: {
          name: 'prepTime',
          label: 'Tiempo de Preparación (min)',
          type: 'number'
        }
      },
      {
        component: 'button',
        config: {
          label: 'Guardar Receta',
          icon: 'pi pi-check'
        },
        action: {
          type: 'submit-form',
          payload: 'recipes'
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
    if (viewId === 'recipe-form-view') {
      return of(FAKE_FORM_SCHEMA);
    }
    return of(null);
  }
}