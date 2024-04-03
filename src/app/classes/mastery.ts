export class Mastery {
    tier: masteryTier;
    letters: string[];
    amount: number = 0;

    constructor(masteryTier: masteryTier, masteryLetters: string[]) {
        this.tier = masteryTier;
        this.letters = masteryLetters;
    }
}

export type masteryTier = "Alpha" | "Beta" | "Gamma" | "Delta" | "Epsilon" | "Dseta" | "Eta" | "Zeta"
