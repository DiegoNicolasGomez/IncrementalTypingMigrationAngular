export class Upgrade {
    name: string;
    description: string;
    amountBought: number;
    cost: number;
    id: number;
  
    constructor(upgradeName: string, upgradeDesc: string, upgradeCost: number, upgradeNumber: number) {
      this.name = upgradeName;
      this.description = upgradeDesc;
      this.amountBought = 0;
      this.cost = upgradeCost;
      this.id = upgradeNumber;
    }
  }
  
export enum eIdUpgrade {
  FirstUpgradePoints = 1,
  WordsValueBitMore = 2,
  ImSpeed = 3,
  WordPassiveEnhancer = 4,
  SecondUpgradePoints = 5,
  EveryGoalReward = 6,
  WordsValueBitMoreMore = 7,
  ScrabbleModule = 8,
  Gacha = 9,
  ThirdUpgradePoints = 10,
  ChallengeYourself = 11,
  LastBasic = 12,
  UnlockModules = 13,
  SameLetterBonus = 14,
  IntermediateBasicsOne = 15,
  WordLengthBonus = 16,
  DifferentLetterBonus = 17,
  IntermediateBasicsTwo = 18,
  CardsAmountBonus = 19,
  QualityCardsBonus = 20
}