import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface ActionEvent {
  type: string;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class ActionBusService {
  private action$ = new Subject<ActionEvent>();

  dispatch(event: ActionEvent) {
    this.action$.next(event);
  }

  on(eventType: string) {
    return this.action$.asObservable().pipe(filter((e: ActionEvent) => e.type === eventType));
  }
}
