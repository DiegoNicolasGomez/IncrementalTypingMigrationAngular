import { Component } from '@angular/core';
import { Game } from 'src/app/classes/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-stats-menu',
  templateUrl: './stats-menu.component.html',
  styleUrls: ['./stats-menu.component.scss']
})
export class StatsMenuComponent {

  gameStats: Game = new Game(0);
  constructor(private gameService: GameService) {
    this.gameService.getGame().subscribe((game) => {
      this.gameStats = game;
    })
  }

  getMultiUpgradesStat(): string {
    const mu1 = this.gameStats.multiUpgrades.find(mu => mu.id === 1)?.amountBought || 0;
    const mu2 = this.gameStats.multiUpgrades.find(mu => mu.id === 2)?.amountBought || 0;
    const mu3 = this.gameStats.multiUpgrades.find(mu => mu.id === 3)?.amountBought || 0;
    return `${mu1} - ${mu2} - ${mu3}`;
}
}
