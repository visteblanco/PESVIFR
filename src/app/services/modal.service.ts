import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }
}
