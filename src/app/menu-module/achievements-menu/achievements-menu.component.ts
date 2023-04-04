import { Component } from '@angular/core';
import { Achievement } from 'src/app/classes/achievement';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-achievements-menu',
  templateUrl: './achievements-menu.component.html',
  styleUrls: ['./achievements-menu.component.scss']
})
export class AchievementsMenuComponent {
  achievements: Achievement[] = [];

  constructor(private achievementService: AchievementsService) {}

  ngOnInit() {
    this.achievements = this.achievementService.getAchievements();
  }
}
