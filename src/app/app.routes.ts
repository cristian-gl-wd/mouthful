import { Routes } from '@angular/router';
import { DynamicViewRendererComponent } from './core/renderer/dynamic-view-renderer/dynamic-view-renderer.component';

export const routes: Routes = [
  {
    path: '',
    component: DynamicViewRendererComponent,
    data: {
      viewId: 'dashboard-view'
    }
  },
  {
    path: 'new-recipe',
    component: DynamicViewRendererComponent,
    data: { viewId: 'recipe-form-view' }
  }
];