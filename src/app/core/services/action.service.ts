import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface Action {
  type: 'navigate' | 'callApi' | 'openDialog';
  payload: any;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private router = inject(Router);

  execute(action: Action): void {
    switch (action.type) {
      case 'navigate':
        this.router.navigate([action.payload]);
        break;

      // En el futuro, podríamos añadir más casos
      // case 'openDialog':
      //   // Lógica para abrir un modal
      //   break;

      default:
        console.warn(`Action type "${action.type}" is not recognized.`);
    }
  }
}
