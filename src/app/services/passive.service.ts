import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, switchMap } from 'rxjs';
import { Generator } from '../classes/generator';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { ActiveService } from './active.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PassiveService {
  generators: Generator[] = [];
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
      (x) => x.name === 'Portable Generator'
    );
    if (!portableGenerator) return;
    const word = this.GetRandomString(this.gameService.game.value.passiveLength);
    this.passiveWord$.next(word);
    var points = this.GetPassivePoints(word);
    points *= portableGenerator.amountGained;
    if (this.gameUtils.IsPurchasedUpgrade("WordPassiveEnhancer"))
      this.gameService.updatePassivePoints(points);
  }

  getPassiveWord() {
    return this.passiveWord$.asObservable();
  }

  // setInterval(this.createWord, this.gameService.game.passiveRate);

  GetPassivePoints(passiveWord: string) {
    var totalPoints = 0;
    totalPoints += passiveWord.length;
    if (this.gameUtils.IsPurchasedPassiveUpgrade('PassiveScrabbleModule'))
      totalPoints += this.activeService.GetPointsLetters(passiveWord, true);
    totalPoints += this.gameService.game.value.cards.filter(x => x.bonusType === 'PassivePointsAmount').reduce((total, card) => total + card.bonusAmount, 0);
    if (this.gameUtils.IsPurchasedPassiveUpgrade("PassiveLittleBonus")) totalPoints += 5;
    if (this.gameUtils.IsPurchasedPassiveUpgrade("PassiveEnhancerEnhancerer")) totalPoints *= 1.25;
    if (this.gameUtils.IsPurchasedPassiveUpgrade("PassiveDontKnow")) totalPoints *= 1.5;
    totalPoints *= 1 + this.gameService.game.value.cards.filter(x => x.bonusType === 'PassivePointsPercentage').reduce((total, card) => total + card.bonusAmount, 0) / 100
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
      if (this.gameUtils.IsPurchasedPassiveUpgrade("PassiveMoreModules")) {
        this.gameService.addGainedGeneratorsBoosted(index);
      } else {
        this.gameService.addGainedGenerators(index);
      }
    }
  }
}
