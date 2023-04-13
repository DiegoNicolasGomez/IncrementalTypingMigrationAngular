export class Challenge {
    name: string;
    description: string;
    rewardDescription: string;
    time: number;
    onChallenge: boolean;
    objective: number;
    amount: number;
    restriction: number;
    id: number;
  
    constructor(
      challengeName: string,
      challengeDescription: string,
      challengeRewardDescription: string,
      challengeTime: number,
      challengeObjective: number,
      challengeRestriction: number,
      challengeNumber: number
    ) {
      this.name = challengeName;
      this.description = challengeDescription;
      this.rewardDescription = challengeRewardDescription;
      this.time = challengeTime;
      this.onChallenge = false;
      this.objective = challengeObjective;
      this.amount = 0;
      this.restriction = challengeRestriction;
      this.id = challengeNumber;
    }
  }
  