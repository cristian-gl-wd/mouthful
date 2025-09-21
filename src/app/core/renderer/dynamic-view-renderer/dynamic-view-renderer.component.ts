import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ViewSchema, ViewSchemaService } from '../../services/view-schema.service';

import { GenericButtonComponent } from '../../../components/generic-button/generic-button.component';
import { GenericCardComponent } from '../../../components/generic-card/generic-card.component';
import { GenericInputComponent } from '../../../components/generic-input/generic-input.component';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GenericCardComponent,
    GenericTableComponent,
    GenericButtonComponent,
    GenericInputComponent,
  ],
  templateUrl: './dynamic-view-renderer.component.html',
})
export class DynamicViewRendererComponent implements OnInit {
  private schemaService = inject(ViewSchemaService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  schema = signal<ViewSchema | null>(null);
  form = this.fb.group({});

  ngOnInit(): void {
    const viewId = this.route.snapshot.data['viewId'];
    if (viewId) {
      this.schemaService.getViewSchema(viewId).subscribe((schema) => {
        if (schema) {
          this.buildForm(schema);
          this.schema.set(schema);
        }
      });
    }
  }

  buildForm(schema: ViewSchema): void {
    const formControls: { [key: string]: FormControl } = {};
    schema.layout.children?.forEach((child) => {
      if (child.component === 'text-input') {
        const validators = [Validators.required];
        if (child.config.type === 'number') {
          validators.push(Validators.min(1));
        }

        formControls[child.config.name] = new FormControl('', validators);
      }
    });
    this.form = this.fb.group(formControls);
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
