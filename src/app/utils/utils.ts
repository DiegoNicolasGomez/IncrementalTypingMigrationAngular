import { gameObjects } from "../classes/game";

export var IsPurchasedUpgrade = (upgradeNumber: number) => gameObjects.game.upgrades.find(x => x.id == upgradeNumber);

export var IsPurchasedPassiveUpgrade = (upgradeNumber: number) => gameObjects.game.passiveUpgrades.find(x => x.id == upgradeNumber);

export var IsPurchasedPrestigeUpgrade = (upgradeNumber: number) => gameObjects.game.prestigeUpgrades.find(x => x.id == upgradeNumber);

export var HasCard = (cardNumber: number) => gameObjects.game.cards.find(x => x.id == cardNumber);

export var Copy = (object: object) => JSON.parse(JSON.stringify(object));

export var IsInChallenge = (challengeNumber: number) => {
    const challenge = gameObjects.game.challenges.find(x => x.id == challengeNumber);
    if(!challenge) return false;
    return challenge.onChallenge;
} 

export var IsUnlockedAchievement = (achievementName: string) => gameObjects.game.achievements.find(x => x.name == achievementName);

export var formatNumber = (num: number) => num.toString().length <= 6 ? num.toString() : num.toExponential(2).toString();