export class Mastery {
    level: number = 0;
    tier: masteryTier;
    value: number;
    letters: string[];
    amountToLevel: number;
    amount: number = 0;

    constructor(masteryTier: masteryTier, masteryValue: number, masteryLetters: string[], masteryAmountToLevel: number) {
        this.tier = masteryTier;
        this.value = masteryValue;
        this.letters = masteryLetters;
        this.amountToLevel = masteryAmountToLevel;
    }
}

export type masteryTier = "Alpha" | "Beta" | "Gamma" | "Delta" | "Epsilon"
