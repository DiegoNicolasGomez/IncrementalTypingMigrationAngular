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
    //CHECK
    if (maintainsPassive) this.upgradeService.getUpgrade("PrestigeBringEnhancer");
  }
}
