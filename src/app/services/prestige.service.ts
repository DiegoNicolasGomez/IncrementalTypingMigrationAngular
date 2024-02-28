import { Injectable } from '@angular/core';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { UpgradeService } from './upgrade.service';

@Injectable({
  providedIn: 'root',
})
export class PrestigeService {
  constructor(
    private gameService: GameService,
    private upgradeService: UpgradeService
  ) {}

  gameUtils = new GameUtils(this.gameService);

  prestigeStats() {
    let maintainsPassive =
      this.gameUtils.IsPurchasedUpgrade('WordPassiveEnhancer') &&
      this.gameUtils.IsPurchasedPrestigeUpgrade("PrestigeBringEnhancer");
    this.gameService.updatePrestige();
    const prestigeBringEnhancer = this.upgradeService.getPrestigeUpgrades().find(x => x.id === "PrestigeBringEnhancer")!;
    const challengeYourself = this.upgradeService.getBasicUpgrades().find(x => x.id === "ChallengeYourself")!;
    //CHECK
    if (maintainsPassive) this.gameService.addUpgrade(prestigeBringEnhancer);
    this.gameService.addUpgrade(challengeYourself)
  }
}
