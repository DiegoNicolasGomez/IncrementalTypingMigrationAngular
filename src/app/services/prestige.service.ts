import { Injectable } from '@angular/core';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { UpgradeService } from './upgrade.service';

@Injectable({
  providedIn: 'root'
})
export class PrestigeService {

  constructor(private gameService: GameService, private upgradeService: UpgradeService) {}

  gameUtils = new GameUtils(this.gameService);

  prestigeStats() {
    let maintainsPassive = false;
    if (
      this.gameUtils.IsPurchasedUpgrade(eIdUpgrade.WordPassiveEnhancer) &&
      this.gameUtils.IsPurchasedPrestigeUpgrade(4)
      ) {
        maintainsPassive = true;
      }
    this.gameService.updatePrestige();
    if(maintainsPassive) this.upgradeService.getUpgrade(4);
  }
}
