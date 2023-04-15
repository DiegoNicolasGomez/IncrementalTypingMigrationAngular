import { Injectable, OnDestroy } from '@angular/core';
import { Achievement } from '../classes/achievement';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService implements OnDestroy{
  private achievements: Achievement[] = [];
  private intervalId;

  constructor(private gameService: GameService, private messageService: MessageService) {
    this.createAchievement(
      new Achievement(
        'First Word',
        'Write your first word. Congratulations! You know how to write!',
        1
      )
    );
    this.createAchievement(
      new Achievement(
        'Ten Words',
        'Write 10 words. Pay attention, it seems that you are close to your first upgrade.',
        2
      )
    );
    this.createAchievement(
      new Achievement('Fifty Words', 'Write 50 words.', 3)
    );
    this.createAchievement(
      new Achievement('One Hundred Words', 'Write 100 words.', 4)
    );
    this.createAchievement(new Achievement('250 Words', 'Write 250 words.', 5));
    this.createAchievement(new Achievement('500 Words', 'Write 500 words.', 6));
    this.createAchievement(
      new Achievement('1000 Words', 'Write 1000 words.', 7)
    );
    this.createAchievement(new Achievement('100 Points', 'Save 100 points', 8));
    this.createAchievement(new Achievement('500 Points', 'Save 500 points', 9));
    this.createAchievement(
      new Achievement('1000 Points', 'Save 1000 points', 10)
    );
    this.createAchievement(
      new Achievement('5000 Points', 'Save 5000 points', 11)
    );
    this.createAchievement(
      new Achievement('10000 Points', 'Save 10000 points', 12)
    );
    this.createAchievement(
      new Achievement('50000 Points', 'Save 50000 points', 13)
    );
    this.createAchievement(
      new Achievement('100000 Points', 'Save 100000 points', 14)
    );
    this.createAchievement(
      new Achievement('200000 Points', 'Save 200000 points', 15)
    );
    this.createAchievement(
      new Achievement('100 Passive Points', 'Reach 100 Passive Points', 16)
    );
    this.createAchievement(
      new Achievement('500 Passive Points', 'Reach 500 Passive Points', 17)
    );
    this.createAchievement(
      new Achievement('1000 Passive Points', 'Reach 1000 Passive Points', 18)
    );
    this.createAchievement(
      new Achievement('2500 Passive Points', 'Reach 2500 Passive Points', 19)
    );
    this.createAchievement(
      new Achievement('10 Cards', 'You bought your first pack!', 20)
    );
    this.createAchievement(new Achievement('50 Cards', 'Have 50 Cards', 21));
    this.createAchievement(new Achievement('100 Cards', 'Have 100 Cards', 22));
    this.createAchievement(
      new Achievement('1 Challenge', 'Complete your first challenge', 23)
    );
    this.createAchievement(
      new Achievement('5 Challenges', 'Complete 5 challenges', 24)
    );
    this.createAchievement(
      new Achievement('Reach Prestige!', 'Prestige for the first time', 25)
    );
    this.createAchievement(
      new Achievement('100 Prestige Points', 'Have 100 Prestige Points', 26)
    );
    this.createAchievement(
      new Achievement('250 Prestige Points', 'Have 250 Prestige Points', 27)
    );
    this.createAchievement(
      new Achievement('500 Prestige Points', 'Have 500 Prestige Points', 28)
    );
    this.createAchievement(
      new Achievement('10-letter Word', 'Write a 10-letter word', 29)
    );
    this.createAchievement(
      new Achievement('Best Word', 'Write the best word possible', 30)
    );

    this.intervalId = setInterval(() => {
      this.checkAchievements();
    }, 100);
  }

  gameUtils = new GameUtils(this.gameService);

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  createAchievement(achievement: Achievement) {
    this.achievements.push(achievement);
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  unlockAchievement(achievementName: string) {
    this.gameService.addAchievement(
      this.achievements.find((x) => x.name == achievementName)!
    );
  }

  checkAchievements() {
    if (
      this.gameService.game.value.wordsAmount >= 1 &&
      !this.gameUtils.IsUnlockedAchievement('First Word')
    ) {
      this.unlockAchievement('First Word');
      this.showAchievement('First Word');
    }

    if (
      this.gameService.game.value.wordsAmount >= 10 &&
      !this.gameUtils.IsUnlockedAchievement('Ten Words')
    ) {
      this.unlockAchievement('Ten Words');
      this.showAchievement('Ten Words');
    }
    if (
      this.gameService.game.value.wordsAmount >= 50 &&
      !this.gameUtils.IsUnlockedAchievement('Fifty Words')
    ) {
      this.unlockAchievement('Fifty Words');
      this.showAchievement('Fifty Words');
    }

    if (
      this.gameService.game.value.wordsAmount >= 100 &&
      !this.gameUtils.IsUnlockedAchievement('One Hundred Words')
    ) {
      this.unlockAchievement('One Hundred Words');
      this.showAchievement('One Hundred Words');
    }

    if (
      this.gameService.game.value.wordsAmount >= 250 &&
      !this.gameUtils.IsUnlockedAchievement('250 Words')
    ) {
      this.unlockAchievement('250 Words');
      this.showAchievement('250 Words');
    }

    if (
      this.gameService.game.value.wordsAmount >= 500 &&
      !this.gameUtils.IsUnlockedAchievement('500 Words')
    ) {
      this.unlockAchievement('500 Words');
      this.showAchievement('500 Words');
    }

    if (
      this.gameService.game.value.wordsAmount >= 1000 &&
      !this.gameUtils.IsUnlockedAchievement('1000 Words')
    ) {
      this.unlockAchievement('1000 Words');
      this.showAchievement('1000 Words');
    }

    if (
      this.gameService.game.value.points >= 100 &&
      !this.gameUtils.IsUnlockedAchievement('100 Points')
    ) {
      this.unlockAchievement('100 Points');
      this.showAchievement('100 Points');
    }

    if (
      this.gameService.game.value.points >= 500 &&
      !this.gameUtils.IsUnlockedAchievement('500 Points')
    ) {
      this.unlockAchievement('500 Points');
      this.showAchievement('500 Points');
    }

    if (
      this.gameService.game.value.points >= 1000 &&
      !this.gameUtils.IsUnlockedAchievement('1000 Points')
    ) {
      this.unlockAchievement('1000 Points');
      this.showAchievement('1000 Points');
    }

    if (
      this.gameService.game.value.points >= 5000 &&
      !this.gameUtils.IsUnlockedAchievement('5000 Points')
    ) {
      this.unlockAchievement('5000 Points');
      this.showAchievement('5000 Points');
    }

    if (
      this.gameService.game.value.points >= 10000 &&
      !this.gameUtils.IsUnlockedAchievement('10000 Points')
    ) {
      this.unlockAchievement('10000 Points');
      this.showAchievement('10000 Points');
    }

    if (
      this.gameService.game.value.points >= 50000 &&
      !this.gameUtils.IsUnlockedAchievement('50000 Points')
    ) {
      this.unlockAchievement('50000 Points');
      this.showAchievement('50000 Points');
    }

    if (
      this.gameService.game.value.points >= 100000 &&
      !this.gameUtils.IsUnlockedAchievement('100000 Points')
    ) {
      this.unlockAchievement('100000 Points');
      this.showAchievement('100000 Points');
    }

    if (
      this.gameService.game.value.points >= 200000 &&
      !this.gameUtils.IsUnlockedAchievement('200000 Points')
    ) {
      this.unlockAchievement('200000 Points');
      this.showAchievement('200000 Points');
    }

    if (
      this.gameService.game.value.passivePoints >= 100 &&
      !this.gameUtils.IsUnlockedAchievement('100 Passive Points')
    ) {
      this.unlockAchievement('100 Passive Points');
      this.showAchievement('100 Passive Points');
    }

    if (
      this.gameService.game.value.passivePoints >= 500 &&
      !this.gameUtils.IsUnlockedAchievement('500 Passive Points')
    ) {
      this.unlockAchievement('500 Passive Points');
      this.showAchievement('500 Passive Points');
    }

    if (
      this.gameService.game.value.passivePoints >= 1000 &&
      !this.gameUtils.IsUnlockedAchievement('1000 Passive Points')
    ) {
      this.unlockAchievement('1000 Passive Points');
      this.showAchievement('1000 Passive Points');
    }

    if (
      this.gameService.game.value.passivePoints >= 2500 &&
      !this.gameUtils.IsUnlockedAchievement('2500 Passive Points')
    ) {
      this.unlockAchievement('2500 Passive Points');
      this.showAchievement('2500 Passive Points');
    }

    if (
      this.gameService.game.value.cards.length >= 10 &&
      !this.gameUtils.IsUnlockedAchievement('10 Cards')
    ) {
      this.unlockAchievement('10 Cards');
      this.showAchievement('10 Cards');
    }

    if (
      this.gameService.game.value.cards.length >= 50 &&
      !this.gameUtils.IsUnlockedAchievement('50 Cards')
    ) {
      this.unlockAchievement('50 Cards');
      this.showAchievement('50 Cards');
    }

    if (
      this.gameService.game.value.cards.length >= 100 &&
      !this.gameUtils.IsUnlockedAchievement('100 Cards')
    ) {
      this.unlockAchievement('100 Cards');
      this.showAchievement('100 Cards');
    }

    if (
      this.gameService.game.value.challengesAmount >= 1 &&
      !this.gameUtils.IsUnlockedAchievement('1 Challenge')
    ) {
      this.unlockAchievement('1 Challenge');
      this.showAchievement('1 Challenge');
    }

    if (
      this.gameService.game.value.challengesAmount >= 5 &&
      !this.gameUtils.IsUnlockedAchievement('5 Challenges')
    ) {
      this.unlockAchievement('5 Challenges');
      this.showAchievement('5 Challenges');
    }

    if (
      this.gameService.game.value.prestigeCount >= 1 &&
      !this.gameUtils.IsUnlockedAchievement('Reach Prestige!')
    ) {
      this.unlockAchievement('Reach Prestige!');
      this.showAchievement('Reach Prestige!');
    }

    if (
      this.gameService.game.value.prestigePoints >= 100 &&
      !this.gameUtils.IsUnlockedAchievement('100 Prestige Points')
    ) {
      this.unlockAchievement('100 Prestige Points');
      this.showAchievement('100 Prestige Points');
    }

    if (
      this.gameService.game.value.prestigePoints >= 250 &&
      !this.gameUtils.IsUnlockedAchievement('250 Prestige Points')
    ) {
      this.unlockAchievement('250 Prestige Points');
      this.showAchievement('250 Prestige Points');
    }

    if (
      this.gameService.game.value.prestigePoints >= 500 &&
      !this.gameUtils.IsUnlockedAchievement('500 Prestige Points')
    ) {
      this.unlockAchievement('500 Prestige Points');
      this.showAchievement('500 Prestige Points');
    }
  }

  showAchievement(achievementName: string) {
    this.messageService.add({severity: 'info', summary: `New Achievement! ${achievementName}`, life: 3000, contentStyleClass: 'my-toast'});
  }
}
