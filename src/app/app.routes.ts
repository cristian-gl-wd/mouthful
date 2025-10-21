import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { DynamicViewRendererComponent } from './core/renderer/dynamic-view-renderer/dynamic-view-renderer.component';
import { ViewSchemaService } from './core/services/view-schema.service';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DynamicViewRendererComponent,
    data: {
      schemaId: 'dashboard',
      schemaType: 'views',
    },
    resolve: {
      node: (route: ActivatedRouteSnapshot) =>
        inject(ViewSchemaService).getViewSchema(route.data['schemaId'], route.data['schemaType']),
    },
  },
  {
    path: 'settings',
    component: SettingsLayoutComponent,
    data: {
      schemaId: 'user-settings',
      schemaType: 'layouts',
    },
    resolve: {
      node: (route: ActivatedRouteSnapshot) =>
        inject(ViewSchemaService).getViewSchema(route.data['schemaId'], route.data['schemaType']),
    },
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        component: DynamicViewRendererComponent,
        data: {
          schemaId: 'settings-profile',
          schemaType: 'panels',
        },
        resolve: {
          node: (route: ActivatedRouteSnapshot) =>
            inject(ViewSchemaService).getViewSchema(
              route.data['schemaId'],
              route.data['schemaType']
            ),
        },
      },
      {
        path: 'account',
        component: DynamicViewRendererComponent,
        data: {
          schemaId: 'settings-account',
          schemaType: 'panels',
        },
        resolve: {
          node: (route: ActivatedRouteSnapshot) =>
            inject(ViewSchemaService).getViewSchema(
              route.data['schemaId'],
              route.data['schemaType']
            ),
        },
      },
      {
        path: 'security',
        component: DynamicViewRendererComponent,
        data: {
          schemaId: 'settings-security',
          schemaType: 'panels',
        },
        resolve: {
          node: (route: ActivatedRouteSnapshot) =>
            inject(ViewSchemaService).getViewSchema(
              route.data['schemaId'],
              route.data['schemaType']
            ),
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
