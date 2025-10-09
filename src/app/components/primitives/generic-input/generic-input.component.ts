import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ViewNode } from '../../../core/services/view-schema.service';

@Component({
  selector: 'app-generic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './generic-input.component.html',
})
export class GenericInputComponent implements OnInit {
  @Input() node!: ViewNode;

  private parentContainer = inject(ControlContainer);
  
  parentForm!: FormGroup;

  ngOnInit(): void {
    this.parentForm = this.parentContainer.control as FormGroup;
  }

  get controlName(): string {
    return this.node.config?.['name'] ?? '';
  }
}