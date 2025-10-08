import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionService } from '../../core/services/action.service';
import { ViewNode } from '../../core/services/view-schema.service';
import { ChildrenRendererComponent } from '../../core/renderer/children-renderer/children-renderer.component';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChildrenRendererComponent],
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent implements OnInit {
  @Input() node!: ViewNode;
  
  private fb = inject(FormBuilder);
  private actionService = inject(ActionService);

  form: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.node.children?.forEach(field => {
      const controlName = field.config?.['name'];
      if (controlName) {
        const validators = field.config?.['required'] ? [Validators.required] : [];
        this.form.addControl(controlName, this.fb.control('', validators));
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid && this.node.action) {
      const actionWithPayload = { ...this.node.action, payload: this.form.value };
      this.actionService.execute(actionWithPayload);
    }
  }
}