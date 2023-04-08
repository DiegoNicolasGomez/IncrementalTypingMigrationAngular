import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  lettersPerSecondVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLettersPerSecondVisibility() {
    return this.lettersPerSecondVisible.asObservable();
  }

  setLettersPerSecondVisibility(visible: boolean) {
    this.lettersPerSecondVisible.next(visible);
  }
}
