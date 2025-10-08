import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActionService } from '../../core/services/action.service';
import { ViewNode } from '../../core/services/view-schema.service';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './generic-button.component.html',
})
export class GenericButtonComponent {
  @Input() node!: ViewNode;

  private actionService = inject(ActionService);

  onClick(): void {
    if (this.node.action) {
      this.actionService.execute(this.node.action);
    }
  }
}