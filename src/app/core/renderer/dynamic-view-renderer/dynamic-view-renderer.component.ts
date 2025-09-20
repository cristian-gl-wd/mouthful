import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ViewSchemaService, ViewSchema } from '../../services/view-schema.service';

import { GenericCardComponent } from '../../../components/generic-card/generic-card.component';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  imports: [CommonModule, GenericCardComponent, GenericTableComponent],
  templateUrl: './dynamic-view-renderer.component.html',
})
export class DynamicViewRendererComponent implements OnInit {
  private schemaService = inject(ViewSchemaService);
  private route = inject(ActivatedRoute);
  schema = signal<ViewSchema | null>(null);

  ngOnInit(): void {
    const viewId = this.route.snapshot.data['viewId'];

    if (viewId) {
      this.schemaService.getViewSchema(viewId).subscribe((schema) => {
        this.schema.set(schema);
      });
    }
  }
}
