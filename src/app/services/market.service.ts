import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  public letterBonus: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    []
  );
  private readonly DATASETSCOUNT = 8;
  private bullMarket: boolean = false;

  constructor(private gameService: GameService) {
    this.initLetterBonus();

    interval(17).subscribe(() => {
      this.changeLetterBonus();
    });

    interval(1000).subscribe(() => {
      if(this.gameUtils.IsPurchasedUpgrade('BullMarket')) {
        if(Math.floor(Math.random() * 10) === 1 && this.bullMarket === false) {
          this.bullMarket = true;
          setTimeout(() => {
            this.bullMarket = false;
          }, 5000)
        }
      }
    })
  }
  gameUtils = new GameUtils(this.gameService);

  initLetterBonus() {
    const datasets = this.letterBonus.value;
    if (this.letterBonus.value.length > 0) return;
    for (let index = 0; index < this.DATASETSCOUNT; index++) {
      datasets.push(this.gameUtils.random(-100, 100));
    }
  }

  changeLetterBonus() {
    const datasets = this.letterBonus.value;
    for (let index = 0; index < datasets.length; index++) {

      if(this.bullMarket) {
        datasets[index] += this.gameUtils.random(0, 5);
      }
      if(Math.floor(Math.random() * 100) == 1) {
        datasets[index] += 100;
        break; 
      }
      if (datasets[index] < -100)
        datasets[index] += this.gameUtils.random(0, 5);
      else if (datasets[index] < -50)
        datasets[index] += this.gameUtils.random(-2, 5);
      else if (datasets[index] <= 100)
        datasets[index] += this.gameUtils.random(-4, 5);
      else if (datasets[index] > 100)
        datasets[index] += this.gameUtils.random(-5, 2);
    }
    this.letterBonus.next(datasets);
  }

  getLettersBonus() {
    return this.letterBonus.asObservable();
  }
}
