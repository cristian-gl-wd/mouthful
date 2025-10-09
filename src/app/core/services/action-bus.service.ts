import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface ActionEvent {
  type: string;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class ActionBusService {
  private action$ = new Subject<ActionEvent>();

  public readonly actions$: Observable<ActionEvent> = this.action$.asObservable();

  dispatch(event: ActionEvent) {
    this.action$.next(event);
  }

  on(eventType: string) {
    return this.actions$.pipe(filter((e: ActionEvent) => e.type === eventType));
  }
}