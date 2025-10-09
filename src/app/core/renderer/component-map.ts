import { Type } from '@angular/core';

// Domain
import { FilterPanelComponent } from '../../components/domain/filter-panel/filter-panel.component';
import { RecipeCardComponent } from '../../components/domain/recipe-card/recipe-card.component';

// Primitives
import { DataListComponent } from '../../components/primitives/data-list/data-list.component';
import { GenericButtonComponent } from '../../components/primitives/generic-button/generic-button.component';
import { GenericCardComponent } from '../../components/primitives/generic-card/generic-card.component';
import { GenericTableComponent } from '../../components/primitives/generic-table/generic-table.component';

// Layouts
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { SidebarLayoutComponent } from '../../layouts/sidebar-layout/sidebar-layout.component';

export const componentMap: Record<string, Type<any>> = {
  // --- Layouts ---
  'grid-layout': GridLayoutComponent,
  'sidebar-layout': SidebarLayoutComponent,

  // --- Primitives ---
  'data-list': DataListComponent,
  'generic-table': GenericTableComponent,
  'generic-card': GenericCardComponent,
  'generic-button': GenericButtonComponent,

  // --- Domain ---
  'filter-panel': FilterPanelComponent,
  'recipe-card': RecipeCardComponent,
};
