export class Generator {
    name: string;
    amountBought: number;
    amountGained: number;
    cost: number;
    id: number;
  
    constructor(generatorName: string, generatorCost: number, generatorNumber: number) {
      this.name = generatorName;
      this.amountBought = 0;
      this.amountGained = 0;
      this.cost = generatorCost;
      this.id = generatorNumber;
    }
  }
  