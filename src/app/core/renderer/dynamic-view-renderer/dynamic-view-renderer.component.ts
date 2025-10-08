import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toSignal } from '@angular/core/rxjs-interop';
import { ViewNode, ViewSchemaService } from '../../services/view-schema.service';
import { ViewDataService } from '../view-data.service';

import { DynamicComponentDirective } from '../dynamic-component.directive';

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DynamicComponentDirective],
  templateUrl: './dynamic-view-renderer.component.html',
  providers: [ViewDataService],
})
export class DynamicViewRendererComponent {
  private route = inject(ActivatedRoute);
  private viewSchemaService = inject(ViewSchemaService);
  private viewDataService = inject(ViewDataService);

  viewId = toSignal(this.route.data.pipe(map((data) => data['viewId'])));
  public schema$: Observable<ViewNode | null>;

  constructor() {  
    this.schema$ = this.viewSchemaService.getViewSchema(this.viewId() ?? '');

    this.schema$.subscribe((schema) => {
      if (schema) {
        this.viewDataService.loadDataForView(schema);
      }
    });
  }
}