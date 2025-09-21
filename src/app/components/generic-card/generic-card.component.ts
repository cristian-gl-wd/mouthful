import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './generic-card.component.html',
})
export class GenericCardComponent {
  @Input() config: any;
}