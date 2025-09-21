import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { GenericCardComponent } from '../../../components/generic-card/generic-card.component';
import { GenericFormComponent } from '../../../components/generic-form/generic-form.component';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { GenericButtonComponent } from '../../../components/generic-button/generic-button.component';

import { ViewSchemaService } from '../../services/view-schema.service';

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  imports: [GenericFormComponent, GenericCardComponent, GenericTableComponent, GenericButtonComponent],
  templateUrl: './dynamic-view-renderer.component.html',
})
export class DynamicViewRendererComponent {
  private viewSchemaService = inject(ViewSchemaService);
  private route = inject(ActivatedRoute);

  schema = toSignal(
    this.route.data.pipe(
      map(data => data['viewId']),
      switchMap(id => this.viewSchemaService.getViewSchema(id))
    ), 
    { initialValue: null }
  );
}