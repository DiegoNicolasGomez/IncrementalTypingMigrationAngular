import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, switchMap } from 'rxjs';
import { Generator } from '../classes/generator';
import { GameUtils } from '../utils/utils';
import { ActiveService } from './active.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PassiveService {
  private generators: Generator[] = [];
  wordInterval$ = interval(5000);
  passiveWord$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private gameService: GameService,
    private activeService: ActiveService) { 
    this.createGenerator(new Generator('Portable Generator', 5, 1));
    this.createGenerator(new Generator('Small Generator', 6, 2));
    this.createGenerator(new Generator('Medium-sized Generator', 9, 3));
    this.createGenerator(new Generator('Ample Generator', 12, 4));
    this.createGenerator(new Generator('Substantial Generator', 15, 5));
    this.createGenerator(new Generator('Reasonable Generator', 18, 6));
    this.createGenerator(new Generator('Large Generator', 21, 7));
    this.createGenerator(new Generator('Major Generator', 24, 8));
    this.createGenerator(new Generator('Jumbo Generator', 27, 9));
    this.createGenerator(new Generator('Colossal Generator', 30, 10));

    this.wordInterval$ = this.gameService.getGame().pipe(
      switchMap(game => interval(game.passiveRate)));
      this.wordInterval$.subscribe(() => {
        this.createWord();
        this.CalculatePassiveGenerators();
      });
    
  }

  gameUtils = new GameUtils(this.gameService);

  createGenerator(generator: Generator) {
    this.generators.push(generator)
  }

  getGenerators(): Generator[] {
    return this.generators;
  }

  createWord() {
    const portableGenerator = this.gameService.game.value.passiveGenerators.find(
      (x) => x.name == 'Portable Generator'
    );
    if (!portableGenerator) return;
    const word = this.GetRandomString(this.gameService.game.value.passiveLength)
    this.passiveWord$.next(word);
    console.log(this.passiveWord$.value)
    var points = this.GetPassivePoints(word);
    points *= portableGenerator.amountGained;
    if (this.gameUtils.IsPurchasedUpgrade(4))
      this.gameService.updatePassivePoints(points);
  }

  getPassiveWord() {
    return this.passiveWord$.asObservable();
  }

  // setInterval(this.createWord, this.gameService.game.passiveRate);

  GetPassivePoints(passiveWord: string) {
    var totalPoints = 0;
    totalPoints += passiveWord.length;
    if (this.gameUtils.IsPurchasedPassiveUpgrade(4))
      totalPoints += this.activeService.GetPointsLetters(passiveWord);
    if (this.gameUtils.HasCard(4))
      totalPoints +=
        2 *
        this.gameService.game.value.cards.filter((x) => x.name === '+2 Passive Points (C)')
          .length;
    if (this.gameUtils.HasCard(8))
      totalPoints +=
        5 *
        this.gameService.game.value.cards.filter(
          (x) => x.name === '+5 Passive Points (UC)'
        ).length;
    if (this.gameUtils.HasCard(15))
      totalPoints +=
        10 *
        this.gameService.game.value.cards.filter(
          (x) => x.name === '+10 Passive Points (E)'
        ).length;
    if (this.gameUtils.HasCard(21))
      totalPoints +=
        25 *
        this.gameService.game.value.cards.filter(
          (x) => x.name === '+25 Passive Points (L)'
        ).length;
    if (this.gameUtils.IsPurchasedPassiveUpgrade(2)) totalPoints += 5;
    if (this.gameUtils.IsPurchasedPassiveUpgrade(1)) totalPoints *= 1.25;
    if (this.gameUtils.IsPurchasedPassiveUpgrade(3)) totalPoints *= 1.5;
    if (this.gameUtils.HasCard(3))
      totalPoints *=
        1 +
        0.1 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === '10% Passive Points (C)'
          ).length;
    if (this.gameUtils.HasCard(7))
      totalPoints *=
        1 +
        0.25 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === '25% Passive Points (UC)'
          ).length;
    if (this.gameUtils.HasCard(14))
      totalPoints *=
        1 +
        0.5 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === '50% Passive Points (E)'
          ).length;
    if (this.gameUtils.HasCard(20))
      totalPoints *=
        1 +
        1 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === 'x2 Passive Points (L)'
          ).length;
    return totalPoints;
  }

  GetRandomString(lettersAmount: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString: string = '';
    for (let i = 0; i < lettersAmount; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }

  CalculatePassiveGenerators() {
    if (this.gameService.game.value.passiveGenerators.length == 1) return;
    for (
      let index = 2;
      index <= this.gameService.game.value.passiveGenerators.length;
      index++
    ) {
      if (this.gameUtils.IsPurchasedPassiveUpgrade(6)) {
        this.gameService.addGainedGeneratorsBoosted(index);
      } else {
        this.gameService.addGainedGenerators(index);
      }
    }
  }
}
