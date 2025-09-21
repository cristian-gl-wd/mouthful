import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

export interface Action {
  type: string;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class ActionService {
  private readonly router = inject(Router);
  private readonly firestore = inject(Firestore);

  execute(action: Action, data?: any): void {
    if (!action) return;

    switch (action.type) {
      case 'navigate':
        this.router.navigate([action.payload]);
        break;

      case 'submit-form':
        this.handleFormSubmit(action, data);
        break;

      default:
        console.error(`Acción no reconocida: ${action.type}`);
    }
  }

  private async handleFormSubmit(action: Action, formData: any): Promise<void> {
    const collectionName = action.payload?.collection;
    if (!collectionName) {
      console.error('La acción "submit-form" requiere un "collection" en su payload.');
      return;
    }
    if (!formData) {
      console.error('No hay datos en el formulario para guardar.');
      return;
    }

    try {
      const docRef = await addDoc(collection(this.firestore, collectionName), formData);
      console.log(`Documento guardado con ID: ${docRef.id} en la colección ${collectionName}`);

      if (action.payload.onSuccess) {
        this.execute(action.payload.onSuccess);
      }
    } catch (error) {
      console.error('Error al guardar el documento:', error);
    }
  }
}
