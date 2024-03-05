import { Achievement } from './achievement';
import { Card } from './card';
import { Challenge } from './challenge';
import { Generator } from './generator';
import { Mastery } from './mastery';
import { Pack } from './pack';
import { Upgrade } from './upgrade';

export class Game {
  points: number;
  allTimePoints: number;
  upgrades: Upgrade[] = [];
  maxLength: number = 4;
  bestWord: string = "";
  multiUpgrades: Upgrade[] = [
    new Upgrade('Point Booster', '+1 Point per Word', 50, 'MultiUpgradePoints'),
    new Upgrade(
      "Long Word Expertise",
      '+1 letter per word',
      100,
      'MultiUpgradeWords'
    ),
    new Upgrade('Multiplier Mastery', 'x1.25 Points', 500, 'MultiUpgradePointsMult'),
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
  packs: Pack[] = [];
  rollsAmount: number = 10;
  challenges: Challenge[] = [];
  challengesAmount: number = 0;
  letterCounter: number = 0;
  prestigePoints: number = 0;
  prestigeCount: number = 0;
  prestigeUpgrades: Upgrade[] = [];
  modulesUnlocked: boolean[] = [];
  mergeAmount: number = 10;
  mergeCardsCost: number = 200;
  lettersBonus: number[] = [1, 2, 3, 4, 5, 8, 10, 20];
  gameType: GameType; 
  masteryLevels: Mastery[] = [
    new Mastery('Alpha', 1, ['s', 'p'], 10),
    new Mastery('Beta', 1.25, ['c', 'a', 't', 'm'], 20),
    new Mastery('Gamma', 1.5, ['b', 'u', 'd', 'r', 'h'], 30),
    new Mastery('Delta', 1.75, ['e', 'n', 'f', 'i', 'o', 'g'], 40),
    new Mastery('Epsilon', 2, ['l', 'w', 'v', 'k', 'j', 'q', 'z', 'y', 'x', '\'', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '&'], 50)
  ];
  letterCounterPerfection: number = 0;
  wordCounterPerfection: number = 0;

  constructor(pointsAmount: number, gameType: GameType) {
    this.points = pointsAmount;
    this.allTimePoints = pointsAmount;
    this.gameType = gameType;
  }
}

export type GameType = "Challenge" | "Active" | "Current"
