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
  