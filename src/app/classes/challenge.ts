export class Challenge {
  type: challengeType;
  description: string;
  rewardDescription: string;
  time: number;
  onChallenge: boolean = false;
  objective: number;
  amount: number = 0;
  restriction: number;

  constructor(
    challengeType: challengeType,
    challengeDescription: string,
    challengeRewardDescription: string,
    challengeTime: number,
    challengeObjective: number,
    challengeRestriction: number
  ) {
    this.type = challengeType;
    this.description = challengeDescription;
    this.rewardDescription = challengeRewardDescription;
    this.time = challengeTime;
    this.objective = challengeObjective;
    this.restriction = challengeRestriction;
  }
}

export type challengeType = 'Accuracy' | 'Speed' | 'Language';
