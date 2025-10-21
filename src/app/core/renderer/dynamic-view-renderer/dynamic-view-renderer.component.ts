import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ViewNode } from '../../services/view-schema.service';
import { DynamicComponentDirective } from '../dynamic-component.directive';
import { ViewDataService } from '../view-data.service';

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  imports: [CommonModule, DynamicComponentDirective],
  templateUrl: './dynamic-view-renderer.component.html',
  providers: [ViewDataService],
})
export class DynamicViewRendererComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private viewDataService = inject(ViewDataService);

  public schema$!: Observable<ViewNode | null | undefined>;
  ngOnInit(): void {
    this.schema$ = this.route.data.pipe(map((data) => data['node'] as ViewNode | null | undefined));

    this.schema$.subscribe((schema) => {
      if (schema) {
        this.viewDataService.loadDataForView(schema);
      }
    });
  }
}
