import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameUtils } from '../../utils/utils';
import { GameService } from 'src/app/services/game.service';
import { Upgrade, eIdUpgrade } from '../../classes/upgrade';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active-menu',
  templateUrl: './active-menu.component.html',
  styleUrls: ['./active-menu.component.scss'],
})
export class ActiveMenuComponent implements OnDestroy {
  multiUpgrades: Upgrade[] = [];
  private multiUpgradesSubscription = new Subscription();

  constructor(public gameService: GameService) {
    this.multiUpgradesSubscription = this.gameService
      .getGame()
      .subscribe((game) => {
        this.multiUpgrades = game.multiUpgrades;
      });
  }

  gameUtils = new GameUtils(this.gameService);

  ngOnDestroy() {
    this.multiUpgradesSubscription.unsubscribe();
  }

  AddMultiUpgrade(upgradeNumber: eIdUpgrade) {
    const multiUpgrade = this.gameService.game.value.multiUpgrades.find(
      (x) => x.id == upgradeNumber
    );
    if(!multiUpgrade) return;
    if (this.gameService.game.value.points >= multiUpgrade.cost) {
      this.gameService.updatePoints(-multiUpgrade.cost);
      this.gameService.buyMultiUpgrade(upgradeNumber);
      this.gameService.setMultiUpgradeCost(
        upgradeNumber,
        this.gameUtils.IsPurchasedPrestigeUpgrade('PrestigeBetterScaling')
          ? 2
          : 1
      );
      if (upgradeNumber == 'MultiUpgradeWords')
        this.gameService.updateMaxLength();
    }
  }
}
