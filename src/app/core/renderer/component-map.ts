import { Type } from '@angular/core';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';

import { GenericButtonComponent } from '../../components/generic-button/generic-button.component';
import { GenericCardComponent } from '../../components/generic-card/generic-card.component';
import { GenericFormComponent } from '../../components/generic-form/generic-form.component';
import { GenericInputComponent } from '../../components/generic-input/generic-input.component';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';

export const componentMap: Record<string, Type<any>> = {
  'grid-layout': GridLayoutComponent,
  'generic-table': GenericTableComponent,
  'generic-card': GenericCardComponent,
  'generic-form': GenericFormComponent,
  'generic-input': GenericInputComponent,
  'generic-button': GenericButtonComponent,
};