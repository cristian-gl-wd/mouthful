import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; // Importamos la pieza REAL de PrimeNG

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [CommonModule, CardModule], // Le decimos que puede usar la pieza p-card
  templateUrl: './generic-card.component.html',
})
export class GenericCardComponent {
  // Este componente espera recibir un objeto 'config' con las instrucciones
  @Input() config: any;
}