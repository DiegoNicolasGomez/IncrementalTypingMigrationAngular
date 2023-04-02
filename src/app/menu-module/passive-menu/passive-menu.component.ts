import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IsPurchasedPassiveUpgrade, HasCard, IsPurchasedUpgrade } from '../../utils/utils';
import { ActiveService } from 'src/app/services/active.service';
import { PassiveService } from 'src/app/services/passive.service';
import { GameService } from 'src/app/services/game.service';
import { Generator } from '../../classes/generator';
// import translator from "./translator";

@Component({
  selector: 'app-passive-menu',
  templateUrl: './passive-menu.component.html',
  styleUrls: ['./passive-menu.component.scss'],
})
export class PassiveMenuComponent implements OnInit {

  generators: Generator[] = [];

  constructor(private activeService: ActiveService, 
    private passiveService: PassiveService, 
    private cd: ChangeDetectorRef,
    private gameService: GameService) {}

  ngOnInit() {
    this.generators = this.passiveService.getGenerators();
  }

  onGeneratorsChange(): void {
    this.generators = this.gameService.game.passiveGenerators;
    this.cd.detectChanges(); // detect changes and update the view
  }

  createWord() {
    const passivePointsWord = document.querySelector('#passivePointsWord');
    const portableGenerator = this.gameService.game.passiveGenerators.find(
      (x) => x.name == 'Portable Generator'
    );
    if (!portableGenerator) return;
    var passiveWord = this.GetRandomString(this.gameService.game.passiveLength);
    if (passivePointsWord) passivePointsWord.textContent = passiveWord;
    var points = this.GetPassivePoints(passiveWord);
    points *= portableGenerator.amountGained;
    if (IsPurchasedUpgrade(4))
      this.gameService.game.passivePoints += points;
  }

  // setInterval(this.createWord, this.gameService.game.passiveRate);

  GetPassivePoints(passiveWord: string) {
    var totalPoints = 0;
    totalPoints += passiveWord.length;
    if (IsPurchasedPassiveUpgrade(4))
      totalPoints += this.activeService.GetPointsLetters(passiveWord);
    if (HasCard(4))
      totalPoints +=
        2 *
        this.gameService.game.cards.filter((x) => x.name === '+2 Passive Points (C)')
          .length;
    if (HasCard(8))
      totalPoints +=
        5 *
        this.gameService.game.cards.filter(
          (x) => x.name === '+5 Passive Points (UC)'
        ).length;
    if (HasCard(15))
      totalPoints +=
        10 *
        this.gameService.game.cards.filter(
          (x) => x.name === '+10 Passive Points (E)'
        ).length;
    if (HasCard(21))
      totalPoints +=
        25 *
        this.gameService.game.cards.filter(
          (x) => x.name === '+25 Passive Points (L)'
        ).length;
    if (IsPurchasedPassiveUpgrade(2)) totalPoints += 5;
    if (IsPurchasedPassiveUpgrade(1)) totalPoints *= 1.25;
    if (IsPurchasedPassiveUpgrade(3)) totalPoints *= 1.5;
    if (HasCard(3))
      totalPoints *=
        1 +
        0.1 *
          this.gameService.game.cards.filter(
            (x) => x.name === '10% Passive Points (C)'
          ).length;
    if (HasCard(7))
      totalPoints *=
        1 +
        0.25 *
          this.gameService.game.cards.filter(
            (x) => x.name === '25% Passive Points (UC)'
          ).length;
    if (HasCard(14))
      totalPoints *=
        1 +
        0.5 *
          this.gameService.game.cards.filter(
            (x) => x.name === '50% Passive Points (E)'
          ).length;
    if (HasCard(20))
      totalPoints *=
        1 +
        1 *
          this.gameService.game.cards.filter(
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
  
  // SetGenerators() {
  //   if (GeneratorButton)
  //     GeneratorButton.textContent = `${translator.t('tierCurrency')} | ${translator.t('cost')} ${
  //       generators.find(
  //         (x) => x.id == this.gameService.game.passiveGenerators.length + 1
  //       )!.cost
  //     } ${translator.t('tierCurrencyAddition')}`;
  // }

  BuyGenerator(generatorNumber: number) {
    const yourGenerator = this.gameService.game.passiveGenerators.find(
      (x) => x.id == generatorNumber
    );
    if (!yourGenerator) return;
    if (generatorNumber == 1) {
      if (this.gameService.game.passivePoints >= yourGenerator.cost) {
        this.gameService.game.passivePoints -= yourGenerator.cost;
        yourGenerator.amountBought++;
        yourGenerator.amountGained++;
        yourGenerator.cost =
          yourGenerator.cost *
          (yourGenerator.amountBought + 1) **
            Math.log10(yourGenerator.amountBought + 1);
      }
    } else {
      if (
        this.gameService.game.passiveGenerators.find(
          (x) => x.id == generatorNumber - 1
        )!.amountGained >= yourGenerator.cost
      ) {
        this.gameService.game.passiveGenerators.find(
          (x) => x.id == generatorNumber - 1
        )!.amountGained -= yourGenerator.cost;
        yourGenerator.amountBought++;
        yourGenerator.amountGained++;
        yourGenerator.cost =
          yourGenerator.cost *
          (yourGenerator.amountBought + 1) **
            Math.log10(yourGenerator.amountBought + 1);
      }
    }
    this.onGeneratorsChange();
  }

  BuyGeneratorTier() {
    const generatorToBuy = this.passiveService.getGenerators().find(
      (x) => x.id == this.gameService.game.passiveGenerators.length + 1
    );
    if (!generatorToBuy) return;
    if (
      this.gameService.game.passiveGenerators.find(
        (x) => x.id == generatorToBuy.id - 1
      )!.amountGained >= generatorToBuy.cost
    ) {
      this.gameService.game.passiveGenerators.find(
        (x) => x.id == generatorToBuy.id - 1
      )!.amountGained -= generatorToBuy.cost;
      this.gameService.game.passiveGenerators.push(generatorToBuy);
      this.gameService.game.passiveGenerators.find((x) => x.id == generatorToBuy.id)!
        .amountBought++;
      this.gameService.game.passiveGenerators.find((x) => x.id == generatorToBuy.id)!
        .amountGained++;

      const generator = document.querySelector(
        `#PassivePointsGenerator${generatorToBuy.id - 1}`
      );
      if (generator && generator instanceof HTMLElement)
        generator.style.display = 'block';
    }
    this.onGeneratorsChange();
  }

  CalculatePassiveGenerators() {
    if (this.gameService.game.passiveGenerators.length == 1) return;
    for (
      let index = 2;
      index <= this.gameService.game.passiveGenerators.length;
      index++
    ) {
      if (IsPurchasedPassiveUpgrade(6)) {
        this.gameService.game.passiveGenerators.find(
          (x) => x.id == index - 1
        )!.amountGained +=
          this.gameService.game.passiveGenerators.find((x) => x.id == index)!
            .amountGained *
          this.gameService.game.passiveGenerators.reduce(
            (acc, val) => acc + val.amountBought,
            0
          );
      } else {
        this.gameService.game.passiveGenerators.find(
          (x) => x.id == index - 1
        )!.amountGained += this.gameService.game.passiveGenerators.find(
          (x) => x.id == index
        )!.amountGained;
      }
    }
  }
}
