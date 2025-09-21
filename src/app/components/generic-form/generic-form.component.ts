import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActionService } from '../../core/services/action.service';

import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { GenericInputComponent } from '../generic-input/generic-input.component';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GenericInputComponent, GenericButtonComponent],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  @Input() children: any[] = [];
  @Input() action: any;

  formGroup!: FormGroup;
  private fb = inject(FormBuilder);
  private actionService = inject(ActionService);

  ngOnInit(): void {
    this.formGroup = this.buildForm();
  }

  private buildForm(): FormGroup {
    const group = this.fb.group({});
    this.children.forEach((child) => {
      if (child.component === 'text-input') {
        group.addControl(child.config.name, this.fb.control(''));
      }
    });
    return group;
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  handleFormSubmit(): void {
    if (this.formGroup.invalid) {
      console.warn('Formulario inválido.');
      return;
    }
    if (this.action) {
      this.actionService.execute(this.action, this.formGroup.value);
    }
  }
}
