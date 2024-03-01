import { Injectable, OnDestroy } from '@angular/core';
import { Achievement } from '../classes/achievement';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { MessageService } from 'primeng/api';
import { Game } from '../classes/game';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService implements OnDestroy {
  private achievements: Achievement[] = [];
  private intervalId;

  constructor(
    private gameService: GameService,
    private messageService: MessageService
  ) {
    this.createAchievement(
      new Achievement(
        'First Scribble',
        'Write your first word. Congratulations! You know how to write!',
        1,
        1,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Decalexicographer',
        'Write 10 words. Pay attention, it seems that you are close to your first upgrade',
        2,
        10,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quinquagenarian Scribe',
        'Write 50 words',
        3,
        50,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Epic 69er',
        'Write 69 words. Nice',
        37,
        69,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Centennial Lexiconist',
        'Write 100 words',
        4,
        100,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Palindrome Prodigy',
        'Write 121 words',
        41,
        121,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quadratopus Scribe',
        'Write 250 words',
        5,
        250,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Blaze It Bard',
        'Write 420 words',
        38,
        420,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quingentenary Scriptor',
        'Write 500 words',
        6,
        500,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Demonic Scribe',
        'Write 666 words',
        42,
        666,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Lucky Seven Lexicographer',
        'Write 777 words',
        39,
        777,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Millenium Maestro',
        'Write 1000 words',
        7,
        1000,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Golden Ratio Scribe',
        'Write 1618 words',
        40,
        1618,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement('Initiate Explorer', 'Save 100 points', 8, 100, 'points')
    );
    this.createAchievement(
      new Achievement('Exemplary Attainer', 'Save 500 points', 9, 500, 'points')
    );
    this.createAchievement(
      new Achievement('Milestone Achiever', 'Save 2000 points', 10, 2000, 'points')
    );
    this.createAchievement(
      new Achievement('Ascendant Achiever', 'Save 8000 points', 11, 8000, 'points')
    );
    this.createAchievement(
      new Achievement('Pinnacle Reacher', 'Save 15000 points', 12, 15000, 'points')
    );
    this.createAchievement(
      new Achievement('Epic Conqueror', 'Save 40000 points', 13, 40000, 'points')
    );
    this.createAchievement(
      new Achievement('Illustrious Achiever', 'Save 80000 points', 14, 80000, 'points')
    );
    this.createAchievement(
      new Achievement(
        'Prestigious Attainer',
        'Save 125000 points',
        15,
        125000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Zenith Attainer',
        'Save 250000 points',
        16,
        250000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Distinguished Master',
        'Save 500000 points',
        17,
        500000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Apex Achiever',
        'Save 1000000 points',
        18,
        1000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Eminent Attainer',
        'Save 3000000 points',
        19,
        3000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Legacy Builder',
        'Save 10000000 points',
        20,
        10000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Venerable Attainer',
        'Save 50000000 points',
        21,
        50000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Currency Collector',
        'Reach 10000 Passive Points',
        22,
        10000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Wealth Accumulator',
        'Reach 200000 Passive Points',
        23,
        200000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Millionaire Aspirant',
        'Reach 5000000 Passive Points',
        24,
        5000000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Tycoon Trailblazer',
        'Reach 100000000 Passive Points',
        25,
        100000000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Card Initiate',
        'You bought your first pack!',
        26,
        10,
        'cardsAmount'
      )
    );
    this.createAchievement(
      new Achievement('Card Enthusiast', 'Have 50 Cards', 27, 50, 'cardsAmount')
    );
    this.createAchievement(
      new Achievement('Strategic Scholar', 'Have 100 Cards', 28, 100, 'cardsAmount')
    );
    this.createAchievement(
      new Achievement('Deck Diversifier', 'Collect cards from 4 different categories', 46, 1, 'Other')
    );
    this.createAchievement(
      new Achievement('Epic Card Hoarder', 'Collect cards from 4 different categories', 47, 500, 'cardsAmount')
    );
    this.createAchievement(
      new Achievement('Legendary Card Archivist', 'Collect 10 legendary cards', 48, 1, 'Other')
    );
    this.createAchievement(
      new Achievement('Card Fusion Alchemist', 'Merge cards 10 times', 49, 1, 'Other')
    );
    this.createAchievement(
      new Achievement('Card Fusion Maestro', 'Merge cards 50 times', 51, 1, 'Other')
    );
    this.createAchievement(
      new Achievement('Divine Interventionist', 'Obtain a Divine Card', 50, 1, 'Other')
    );
    this.createAchievement(
      new Achievement(
        'Challenge Novice',
        'Complete your first challenge',
        29,
        1,
        'challengesAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Challenge Conqueror',
        'Complete 5 challenges',
        30,
        5,
        'challengesAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Prestige Pioneer',
        'Prestige for the first time',
        31,
        1,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Rebirth Recruit',
        'Prestige 5 times',
        52,
        5,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quantum Resetter',
        'Prestige 10 times',
        53,
        10,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Point Purveyor',
        'Have 100 Prestige Points',
        32,
        100,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quantum Quantumizer',
        'Have 250 Prestige Points',
        33,
        250,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Eternal Point Maven',
        'Have 500 Prestige Points',
        34,
        500,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '10-letter Word',
        'Write a 10-letter word',
        35,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Best Word',
        'Write the best word possible',
        36,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Consonant Collector',
        'Write a word that contains 5 consecutive consonants',
        43,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Vowel Voyager',
        'Write a word that contains 4 consecutive vowels',
        44,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Palindrome Searcher',
        'Write a palindrome word',
        45,
        1,
        'Other'
      )
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

  compareProgress(achievement: Achievement) {
    const target =
      this.gameService.game.value[achievement.property as keyof Game];
    if (!(typeof target === 'number')) {
      return;
    }

    if (target >= achievement.target) {
      this.unlockAchievement(achievement.name);
      this.showAchievement(achievement.name);
    }
  }

  getAchievementProgress(achievement: Achievement): number {
    const target =
      this.gameService.game.value[achievement.property as keyof Game];
    if (!(typeof target === 'number')) {
      return 0;
    }
    const progress = (target * 100) / achievement.target;
    return progress <= 100 ? progress : 100;
  }

  checkAchievements() {
    this.achievements.forEach((achievement) => {
      if (this.gameUtils.IsUnlockedAchievement(achievement.name)) {
        return;
      }
      this.compareProgress(achievement);
    });
  }

  showAchievement(achievementName: string) {
    this.messageService.add({
      severity: 'info',
      summary: `New Achievement! ${achievementName}`,
      life: 3000,
      contentStyleClass: 'my-toast',
    });
  }
}
