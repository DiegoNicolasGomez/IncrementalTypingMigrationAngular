import { GameService } from 'src/app/services/game.service';

export class GameUtils {

    constructor(private gameService: GameService) {}

    
    IsPurchasedUpgrade(upgradeNumber: number): boolean {
        return this.gameService.game.value.upgrades.some(x => x.id == upgradeNumber);
    }
    
    IsPurchasedPassiveUpgrade(upgradeNumber: number): boolean {
        return this.gameService.game.value.passiveUpgrades.some(x => x.id == upgradeNumber);
    }
    
    IsPurchasedPrestigeUpgrade(upgradeNumber: number): boolean {
        return this.gameService.game.value.prestigeUpgrades.some(x => x.id == upgradeNumber);
    }
    
    HasCard (cardNumber: number): boolean {
        return this.gameService.game.value.cards.some(x => x.id == cardNumber);
    }
    
    Copy(object: object) {
        return JSON.parse(JSON.stringify(object));
    }
    
    IsInChallenge(challengeNumber: number): boolean {
        const challenge = this.gameService.game.value.challenges.find(x => x.id == challengeNumber);
        if(!challenge) return false;
        return challenge.onChallenge;
    } 
    
    IsUnlockedAchievement(achievementName: string): boolean {
        return this.gameService.game.value.achievements.some(x => x.name == achievementName);
    }
}