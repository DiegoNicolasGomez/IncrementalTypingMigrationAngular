import { Achievement } from './achievement';
import { Card } from './card';
import { Challenge } from './challenge';
import { Generator } from './generator';
import { Upgrade } from './upgrade';

export class Game {
  points: number;
  allTimePoints: number;
  upgrades: Upgrade[] = [];
  maxLength: number = 4;
  bestWord: string = "";
  multiUpgrades: Upgrade[] = [
    new Upgrade('You have to start somewhere', '+1 Point per Word', 50, 'MultiUpgradePoints'),
    new Upgrade(
      "I'm sure you can handle longer words, am i right?",
      '+1 letter per word',
      100,
      'MultiUpgradeWords'
    ),
    new Upgrade('Simple is better', 'x1.25 Points', 500, 'MultiUpgradePointsMult'),
  ];
  achievements: Achievement[] = [];
  wordsAmount: number = 0;
  passiveGenerators: Generator[] = [];
  passiveUpgrades: Upgrade[] = [];
  passiveLength: number = 4;
  passivePoints: number = 0;
  passiveRate: number = 1000;
  cards: Card[] = [];
  cardsAmount: number = 0;
  cardCost: number = 0;
  rollsAmount: number = 10;
  packsBought: number = 0;
  challenges: Challenge[] = [];
  isInChallenge: boolean = false;
  challengesAmount: number = 0;
  letterCounter: number = 0;
  prestigePoints: number = 0;
  prestigeCount: number = 0;
  prestigeUpgrades: Upgrade[] = [];
  modulesUnlocked: boolean[] = [];
  mergeAmount: number = 10;
  mergeCardsCost: number = 200;
  lettersBonus: number[] = [1, 2, 3, 4, 5, 8, 10, 20];

  constructor(pointsAmount: number) {
    this.points = pointsAmount;
    this.allTimePoints = pointsAmount;
  }
}
