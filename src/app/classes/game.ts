import { Achievement } from './achievement';
import { Card } from './card';
import { Challenge } from './challenge';
import { Generator } from './generator';
import { Upgrade } from './upgrade';

export class Game {
  points: number;
  allTimePoints: number;
  upgrades: Upgrade[];
  maxLength: number;
  bestWord: string;
  multiUpgrades: Upgrade[];
  achievements: Achievement[];
  wordsAmount: number;
  passiveGenerators: Generator[];
  passiveUpgrades: Upgrade[];
  passiveLength: number;
  passivePoints: number;
  passiveRate: number;
  cards: Card[];
  cardsAmount: number;
  cardCost: number;
  rollsAmount: number;
  packsBought: number;
  challenges: Challenge[];
  isInChallenge: boolean;
  challengesAmount: number;
  letterCounter: number;
  prestigePoints: number;
  prestigeCount: number;
  prestigeUpgrades: Upgrade[];
  modulesUnlocked: boolean[];
  mergeAmount: number;
  mergeCardsCost: number;
  lettersBonus: number[];


  constructor(pointsAmount: number) {
    this.points = pointsAmount;
    this.allTimePoints = pointsAmount;
    this.upgrades = [];
    this.maxLength = 4;
    this.bestWord = '';
    this.multiUpgrades = [
      new Upgrade('You have to start somewhere', '+1 Point per Word', 50, 1),
      new Upgrade(
        "I'm sure you can handle longer words, am i right?",
        '+1 letter per word',
        100,
        2
      ),
      new Upgrade('Simple is better', 'x1.25 Points', 500, 3),
    ];
    this.achievements = [];
    this.wordsAmount = 0;
    this.passiveGenerators = [];
    this.passiveUpgrades = [];
    this.passiveLength = 4;
    this.passivePoints = 0;
    this.passiveRate = 1000;
    this.cards = [];
    this.cardsAmount = 0;
    this.cardCost = 0;
    this.rollsAmount = 10;
    this.packsBought = 0;
    this.challenges = [];
    this.isInChallenge = false;
    this.challengesAmount = 0;
    this.letterCounter = 0;
    this.prestigePoints = 0;
    this.prestigeCount = 0;
    this.prestigeUpgrades = [];
    this.modulesUnlocked = [];
    this.mergeAmount = 10;
    this.mergeCardsCost = 200;
    this.lettersBonus = [1, 2, 3, 4, 5, 8, 10, 20];
  }
}
