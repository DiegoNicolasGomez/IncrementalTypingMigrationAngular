import { Injectable } from '@angular/core';
import { Achievement } from '../classes/achievement';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private achievements: Achievement[] = [];

  constructor(private gameService: GameService) { 
    this.createAchievement(
      new Achievement(
        "First Word",
        "Write your first word. Congratulations! You know how to write!"
      )
    );
    this.createAchievement(
      new Achievement(
        "Ten Words",
        "Write 10 words. Pay attention, it seems that you are close to your first upgrade."
      )
    );
    this.createAchievement(new Achievement("Fifty Words", "Write 50 words."));
    this.createAchievement(new Achievement("One Hundred Words", "Write 100 words."));
    this.createAchievement(new Achievement("250 Words", "Write 250 words."));
    this.createAchievement(new Achievement("500 Words", "Write 500 words."));
    this.createAchievement(new Achievement("1000 Words", "Write 1000 words."));
    this.createAchievement(new Achievement("100 Points", "Save 100 points"));
    this.createAchievement(new Achievement("500 Points", "Save 500 points"));
    this.createAchievement(new Achievement("1000 Points", "Save 1000 points"));
    this.createAchievement(new Achievement("5000 Points", "Save 5000 points"));
    this.createAchievement(new Achievement("10000 Points", "Save 10000 points"));
    this.createAchievement(new Achievement("50000 Points", "Save 50000 points"));
    this.createAchievement(new Achievement("100000 Points", "Save 100000 points"));
    this.createAchievement(new Achievement("200000 Points", "Save 200000 points"));
    this.createAchievement(
      new Achievement("100 Passive Points", "Reach 100 Passive Points")
    );
    this.createAchievement(
      new Achievement("500 Passive Points", "Reach 500 Passive Points")
    );
    this.createAchievement(
      new Achievement("1000 Passive Points", "Reach 1000 Passive Points")
    );
    this.createAchievement(
      new Achievement("2500 Passive Points", "Reach 2500 Passive Points")
    );
    this.createAchievement(new Achievement("10 Cards", "You bought your first pack!"));
    this.createAchievement(new Achievement("50 Cards", "Have 50 Cards"));
    this.createAchievement(new Achievement("100 Cards", "Have 100 Cards"));
    this.createAchievement(
      new Achievement("1 Challenge", "Complete your first challenge")
    );
    this.createAchievement(new Achievement("5 Challenges", "Complete 5 challenges"));
    this.createAchievement(
      new Achievement("Reach Prestige!", "Prestige for the first time")
    );
    this.createAchievement(
      new Achievement("100 Prestige Points", "Have 100 Prestige Points")
    );
    this.createAchievement(
      new Achievement("250 Prestige Points", "Have 250 Prestige Points")
    );
    this.createAchievement(
      new Achievement("500 Prestige Points", "Have 500 Prestige Points")
    );
    this.createAchievement(new Achievement("10-letter Word", "Write a 10-letter word"));
    this.createAchievement(new Achievement("Best Word", "Write the best word possible"));
  }

  createAchievement(achievement: Achievement) {
    this.achievements.push(achievement);
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  unlockAchievement(achievementName: string) {
    this.gameService.addAchievement(this.achievements.find(x => x.name == achievementName)!)
  }
}
