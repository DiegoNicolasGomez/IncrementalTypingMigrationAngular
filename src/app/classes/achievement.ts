import { Game } from "./game";

export class Achievement {
    id: number
    name: string;
    description: string;
    target: number;
    property: keyof Game | ExternalProperty;
  
    constructor(achievementName: string, achievementDesc: string, achievementNumber: number, target: number, property: keyof Game | ExternalProperty) {
      this.id = achievementNumber;
      this.name = achievementName;
      this.description = achievementDesc;
      this.property = property;
      this.target = target;
    }
  }

export enum ExternalProperty {
  Other = 'Other'
}