import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Esta es la estructura que tendrá cualquier pieza de nuestra vista
export interface ViewNode {
  component: string; // El tipo de pieza de LEGO (ej: 'primeng-card')
  config?: any; // Instrucciones específicas para esa pieza (ej: el título de una tarjeta)
  dataSource?: any; // De dónde sacar la información (ej: de la colección 'recetas')
  children?: ViewNode[]; // Otras piezas que van DENTRO de esta
}

// Esta es la estructura de la receta completa
export interface ViewSchema {
  viewId: string; // El nombre de la receta
  layout: ViewNode; // La pieza principal que contiene todo
}

// Nuestra primera receta mágica!
const FAKE_DASHBOARD_SCHEMA: ViewSchema = {
  viewId: 'dashboard-view',
  layout: {
    component: 'layout-main', // Un contenedor principal
    children: [
      {
        component: 'primeng-card', // Queremos construir una "tarjeta"
        config: {
          title: '¡Bienvenido a la Plataforma Mágica!',
          subtitle: 'Esto se ha construido solo con una receta.',
          content: 'En los siguientes pasos, haremos que esto sea mucho más potente.'
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

  // Cuando alguien pida una receta, se la damos
  // AÑADIMOS EL TIPO DE RETORNO AQUÍ
  getViewSchema(viewId: string): Observable<ViewSchema | null> {
    if (viewId === 'dashboard-view') {
      // Usamos 'of()' para simular que viene de internet
      return of(FAKE_DASHBOARD_SCHEMA);
    }
    return of(null); // Si no encontramos la receta, no devolvemos nada
  }
}