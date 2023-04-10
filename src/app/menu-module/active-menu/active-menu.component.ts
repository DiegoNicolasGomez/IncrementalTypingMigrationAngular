import { Component, OnInit } from '@angular/core';
import { GameUtils } from '../../utils/utils';
import { GameService } from 'src/app/services/game.service';
import { Upgrade } from '../../classes/upgrade';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-active-menu',
  templateUrl: './active-menu.component.html',
  styleUrls: ['./active-menu.component.scss'],
})
export class ActiveMenuComponent implements OnInit {
  multiUpgrades: Upgrade[] = [];

  constructor(
    public gameService: GameService,
    private upgradeService: UpgradeService
  ) {}

  gameUtils = new GameUtils(this.gameService);

  ngOnInit() {
    this.multiUpgrades = this.upgradeService.getMultiUpgrades();
  }

  AddMultiUpgrade(upgradeNumber: number) {
    const upgrade = this.multiUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (this.gameService.game.value.points >= upgrade.cost) {
      this.gameService.updatePoints(-upgrade.cost);

      if (
        !this.gameService.game.value.multiUpgrades.find(
          (x) => x.id == upgradeNumber
        )
      ) {
        this.gameService.addMultiUpgrade(upgrade);
      }

      const upgradeBought = this.gameService.game.value.multiUpgrades.find(
        (x) => x.id == upgradeNumber
      );
      if (!upgradeBought) return;

      this.gameService.buyMultiUpgrade(upgradeNumber);

      this.gameService.setMultiUpgradeCost(upgradeNumber, 1);
      if (this.gameUtils.IsPurchasedPrestigeUpgrade(3))
        this.gameService.setMultiUpgradeCost(upgradeNumber, 2);
      if (upgradeNumber == 2) this.gameService.updateMaxLength();
    }
  }
}
