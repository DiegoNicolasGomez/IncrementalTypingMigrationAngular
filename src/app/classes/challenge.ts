export class Challenge {
    name: string;
    description: string;
    rewardDescription: string;
    time: number;
    onChallenge: boolean = false;
    objective: number;
    amount: number = 0;
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
      this.objective = challengeObjective;
      this.restriction = challengeRestriction;
      this.id = challengeNumber;
    }
  }
  