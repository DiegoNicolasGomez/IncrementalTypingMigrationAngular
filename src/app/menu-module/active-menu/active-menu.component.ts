import { Component, OnInit } from '@angular/core';
import { GameUtils } from '../../utils/utils';
import { GameService } from 'src/app/services/game.service';
import { Upgrade } from '../../classes/upgrade';

@Component({
  selector: 'app-active-menu',
  templateUrl: './active-menu.component.html',
  styleUrls: ['./active-menu.component.scss']
})
export class ActiveMenuComponent implements OnInit {
  multiUpgrades: Upgrade[] = [];

  constructor(public gameService: GameService) {}

  gameUtils = new GameUtils(this.gameService);

  ngOnInit() {
    this.multiUpgrades.push(
      new Upgrade('You have to start somewhere', '+1 Point per Word', 50, 1)
    );
    this.multiUpgrades.push(
      new Upgrade(
        "I'm sure you can handle longer words, am i right?",
        '+1 letter per word',
        100,
        2
      )
    );
    this.multiUpgrades.push(
      new Upgrade('Simple is better', 'x1.25 Points', 500, 3)
    );
  }

  CalculatePoints(wordLength: number) {
    var totalPoints: number = 0;
    totalPoints += wordLength;
    const multiUpgrade1 = this.gameService.game.multiUpgrades.find((x) => x.id == 1);
    totalPoints += multiUpgrade1 ? multiUpgrade1.amountBought : 0;
    if (this.gameUtils.IsPurchasedUpgrade(2)) totalPoints += 4;
    if (this.gameUtils.IsPurchasedUpgrade(12)) totalPoints += 20;
    if (this.gameUtils.HasCard(2))
      totalPoints +=
        1 *
        this.gameService.game.cards.filter((x) => x.name === '+1 Points (C)').length;
    if (this.gameUtils.HasCard(6))
      totalPoints +=
        1 *
        this.gameService.game.cards.filter((x) => x.name === '+3 Points (UC)')
          .length;
    if (this.gameUtils.HasCard(13))
      totalPoints +=
        1 *
        this.gameService.game.cards.filter((x) => x.name === '+6 Points (E)').length;
    if (this.gameUtils.HasCard(19))
      totalPoints +=
        1 *
        this.gameService.game.cards.filter((x) => x.name === '+10 Points (L)')
          .length;
    if (this.gameUtils.IsPurchasedUpgrade(8)) totalPoints += 10;
    if (this.gameUtils.IsPurchasedUpgrade(1)) totalPoints *= 1.5;
    if (this.gameUtils.IsPurchasedUpgrade(5)) totalPoints *= 1.3;
    if (this.gameUtils.IsPurchasedUpgrade(10)) totalPoints *= 2;
    if (this.gameUtils.IsPurchasedUpgrade(6) && this.gameService.game.achievements.length > 0)
      totalPoints *= Math.sqrt(this.gameService.game.achievements.length);
    if (this.gameUtils.IsPurchasedUpgrade(4) && this.gameService.game.passivePoints > 0)
      totalPoints *= Math.log10(this.gameService.game.passivePoints);
    if (this.gameUtils.HasCard(1))
      totalPoints *=
        1 +
        0.05 *
          this.gameService.game.cards.filter((x) => x.name === 'Fast+ Progress (C)')
            .length;
    if (this.gameUtils.HasCard(5))
      totalPoints *=
        1 +
        0.25 *
          this.gameService.game.cards.filter(
            (x) => x.name === 'Faster Progress (UC)'
          ).length;
    if (this.gameUtils.HasCard(11))
      totalPoints *=
        1 +
        0.5 *
          this.gameService.game.cards.filter(
            (x) => x.name === 'Fasterer Progress (E)'
          ).length;
    if (this.gameUtils.HasCard(18))
      totalPoints *=
        1 +
        1 *
          this.gameService.game.cards.filter(
            (x) => x.name === 'Fastest Progress (L)'
          ).length;
    const multiUpgrade2 = this.gameService.game.multiUpgrades.find((x) => x.id == 2);
    totalPoints *= !multiUpgrade2 ? 1 : 1 + multiUpgrade2.amountBought * 0.25;
    if (this.gameUtils.IsPurchasedPrestigeUpgrade(1)) totalPoints *= 2;
    return totalPoints;
  }

  AddMultiUpgrade(upgradeNumber: number) {
    const upgrade = this.multiUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (this.gameService.game.points >= upgrade.cost) {
      this.gameService.game.points -= upgrade.cost;

      if (!this.gameService.game.multiUpgrades.find((x) => x.id == upgradeNumber)) {
        this.gameService.game.multiUpgrades.push(upgrade);
      }

      const upgradeBought = this.gameService.game.multiUpgrades.find(
        (x) => x.id == upgradeNumber
      );
      if (!upgradeBought) return;

      upgradeBought.amountBought++;

      var costAux = upgradeBought.cost;
      upgradeBought.cost =
        costAux *
        (upgradeBought.amountBought + 1) **
          Math.log10(upgradeBought.amountBought + 1);
      if (this.gameUtils.IsPurchasedPrestigeUpgrade(3))
        upgradeBought.cost =
          costAux *
          (upgradeBought.amountBought / 2 + 1) **
            Math.log10(upgradeBought.amountBought / 2 + 1);
      if (upgradeNumber == 2) this.gameService.game.maxLength++;
    }
  }
}
