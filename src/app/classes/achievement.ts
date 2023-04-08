export class Achievement {
    id: number
    name: string;
    description: string;
  
    constructor(achievementName: string, achievementDesc: string, achievementNumber: number) {
      this.id = achievementNumber;
      this.name = achievementName;
      this.description = achievementDesc;
    }
  }
  