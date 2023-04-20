export class Generator {
    name: string;
    amountBought: number;
    amountGained: number;
    synergyValue: number;
    synergyCost: number;
    cost: number;
    id: number;
  
    constructor(generatorName: string, generatorCost: number, generatorNumber: number) {
      this.name = generatorName;
      this.amountBought = 0;
      this.amountGained = 0;
      this.synergyValue = 1;
      this.synergyCost = 1_000_000_000_000;
      this.cost = generatorCost;
      this.id = generatorNumber;
    }
  }
  