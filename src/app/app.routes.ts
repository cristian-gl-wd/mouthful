import { Routes } from '@angular/router';
import { DynamicViewRendererComponent } from './core/renderer/dynamic-view-renderer/dynamic-view-renderer.component';

export const routes: Routes = [
  // Cuando alguien visite la página principal (''), redirígelo a '/dashboard'
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Cuando alguien visite la página '/dashboard'...
  {
    path: 'dashboard',
    component: DynamicViewRendererComponent, // ...usa nuestro robot constructor...
    data: { viewId: 'dashboard-view' } // ...y dile que use la receta 'dashboard-view'.
  }
];