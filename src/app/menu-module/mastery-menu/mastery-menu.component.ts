import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mastery } from 'src/app/classes/mastery';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-mastery-menu',
  templateUrl: './mastery-menu.component.html',
  styleUrls: ['./mastery-menu.component.scss'],
})
export class MasteryMenuComponent {
  masteries: Mastery[] = [];
  private masterySubscription = new Subscription();

  constructor(public gameService: GameService) {
    this.masterySubscription = this.gameService.getGame().subscribe((game) => {
      this.masteries = game.masteryLevels;
    });
  }

  ngOnDestroy() {
    this.masterySubscription.unsubscribe();
  }

}
