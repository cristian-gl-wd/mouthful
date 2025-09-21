import { Component, Input, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { Action, ActionService } from '../../core/services/action.service';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './generic-button.component.html',
})
export class GenericButtonComponent {
  @Input() config: any;
  @Input() action: Action | undefined;

  private actionService = inject(ActionService);

  @HostListener('click')
  onHostClick(): void {
    if (this.action && this.config?.type !== 'submit') {
      this.actionService.execute(this.action);
    }
  }
}
