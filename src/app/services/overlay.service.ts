import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../classes/card';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  cards$ = new BehaviorSubject<Card[]>([]);
  constructor() { }

  appendCards(cards: Card[]){
    this.cards$.next(cards);
  }

  getCards(): Observable<Card[]> {
    return this.cards$.asObservable();
  }
}
