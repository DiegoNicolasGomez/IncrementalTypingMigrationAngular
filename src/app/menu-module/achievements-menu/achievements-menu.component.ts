import { Component } from '@angular/core';
import { Achievement } from 'src/app/classes/achievement';
import { AchievementsService } from 'src/app/services/achievements.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-achievements-menu',
  templateUrl: './achievements-menu.component.html',
  styleUrls: ['./achievements-menu.component.scss']
})
export class AchievementsMenuComponent {
  achievements: Achievement[] = [];

  constructor(private achievementService: AchievementsService, private gameService: GameService) {}

  ngOnInit() {
    this.achievements = this.achievementService.getAchievements();
  }

  isUnlocked(achievementNumber: number) {
    const isUnlocked =  this.gameService.game.value.achievements.some(x => x.id == achievementNumber);
    return isUnlocked ? 'unlocked' : '';
  }
}
