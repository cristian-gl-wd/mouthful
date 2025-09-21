import { Routes } from '@angular/router';
import { DynamicViewRendererComponent } from './core/renderer/dynamic-view-renderer/dynamic-view-renderer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DynamicViewRendererComponent,
    data: {
      viewId: 'dashboard-view'
    }
  },
  {
    path: 'recipes/new',
    component: DynamicViewRendererComponent,
    data: { viewId: 'recipe-form-view' }
  }
];