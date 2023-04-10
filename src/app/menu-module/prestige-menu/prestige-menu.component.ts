import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { PrestigeService } from 'src/app/services/prestige.service';
import { GameUtils } from 'src/app/utils/utils';

@Component({
  selector: 'app-prestige-menu',
  templateUrl: './prestige-menu.component.html',
  styleUrls: ['./prestige-menu.component.scss']
})
export class PrestigeMenuComponent {

  prestigePointsToGet: number = 0;
  prestigePoints: number = 0;

  constructor(private gameService: GameService, private prestigeService: PrestigeService) {
    this.gameService.getGame().subscribe((game) => {
      this.prestigePoints = game.prestigePoints;
      this.prestigePointsToGet = Math.round(Math.cbrt(game.allTimePoints));
    });
  }

  prestigeGame() {
    this.prestigeService.prestigeStats();
  }
}