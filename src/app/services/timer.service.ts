import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private gameTimerStart: number;

  constructor() { 
    this.gameTimerStart = Date.now();
  }

  logGameTimer(message?: string) {
    console.log((Date.now() - this.gameTimerStart) / 1000, message);
  }
}
