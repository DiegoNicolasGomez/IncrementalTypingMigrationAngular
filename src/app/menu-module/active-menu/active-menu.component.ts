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
  lengthUpgradeBlocked: boolean = false;

  constructor(public gameService: GameService, public upgradeService: UpgradeService) {
    this.multiUpgradesSubscription = this.gameService
      .getGame()
      .subscribe((game) => {
        this.multiUpgrades = game.multiUpgrades;
      });

      this.upgradeService.getLengthUpgradeBlocked().subscribe((prop) => {
        this.lengthUpgradeBlocked = prop;
      })
  }

  gameUtils = new GameUtils(this.gameService);

  ngOnDestroy() {
    this.multiUpgradesSubscription.unsubscribe();
  }

  AddMultiUpgrade(upgradeNumber: eIdUpgrade) {
   this.upgradeService.getMultiUpgrade(upgradeNumber);
  }
}
