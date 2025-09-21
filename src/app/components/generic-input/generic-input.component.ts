import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-generic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './generic-input.component.html',
})
export class GenericInputComponent {
  @Input() config: any;
  @Input() control!: FormControl;
}
