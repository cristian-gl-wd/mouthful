import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GenericButtonComponent } from '../../../components/generic-button/generic-button.component';
import { GenericCardComponent } from '../../../components/generic-card/generic-card.component';
import { GenericFormComponent } from '../../../components/generic-form/generic-form.component';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';

import { ViewNode, ViewSchemaService } from '../../services/view-schema.service';

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  imports: [
    CommonModule,
    GenericFormComponent,
    GenericCardComponent,
    GenericTableComponent,
    GenericButtonComponent,
  ],
  templateUrl: './dynamic-view-renderer.component.html',
})
export class DynamicViewRendererComponent {
  private viewSchemaService = inject(ViewSchemaService);
  private route = inject(ActivatedRoute);

  public schema$: Observable<ViewNode | null>;

  constructor() {
    this.schema$ = this.route.data.pipe(
      map((data) => data['viewId']),
      switchMap((id) => this.viewSchemaService.getViewSchema(id))
    );

    this.schema$.subscribe((schema) => {
      if (!schema) {
        console.error('No se encontró el esquema para la vista solicitada.');
      }
    });
  }
}