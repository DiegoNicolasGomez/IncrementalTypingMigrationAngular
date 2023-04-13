import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { PrestigeService } from 'src/app/services/prestige.service';
import { GameUtils } from 'src/app/utils/utils';

@Component({
  selector: 'app-prestige-menu',
  templateUrl: './prestige-menu.component.html',
  styleUrls: ['./prestige-menu.component.scss'],
})
export class PrestigeMenuComponent {
  prestigePointsToGet: number = 0;
  prestigePoints: number = 0;

  constructor(
    private gameService: GameService,
    private prestigeService: PrestigeService,
    private renderer: Renderer2
  ) {
    this.gameService.getGame().subscribe((game) => {
      this.prestigePoints = game.prestigePoints;
      this.prestigePointsToGet = Math.round(Math.cbrt(game.allTimePoints));
    });
  }

  prestigeGame() {
    this.prestigeService.prestigeStats();
  }

  fadeOutBody() {
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'fade-out');
    setTimeout(() => {
      this.prestigeGame();
      this.renderer.removeClass(body, 'fade-out');
    }, 1000); // 1000ms = 1s, adjust the timeout to match the duration of your CSS animation
  }
}
