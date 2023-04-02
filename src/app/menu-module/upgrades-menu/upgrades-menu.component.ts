import { Component, OnInit } from '@angular/core';
import { PassiveService } from 'src/app/services/passive.service';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { GameService } from 'src/app/services/game.service';
import { Upgrade } from '../../classes/upgrade';
import { Generator } from '../../classes/generator';

@Component({
  selector: 'app-upgrades-menu',
  templateUrl: './upgrades-menu.component.html',
  styleUrls: ['./upgrades-menu.component.scss'],
})
export class UpgradesMenuComponent implements OnInit {
  constructor(
    private upgradeService: UpgradeService,
    private passiveService: PassiveService,
    private GameService: GameService
  ) {}

  basicUpgrades: Upgrade[] = [];
  passiveUpgrades: Upgrade[] = [];
  prestigeUpgrades: Upgrade[] = [];

  generators: Generator[] = [];

  ngOnInit() {
   
    this.basicUpgrades = this.upgradeService.getBasicUpgrades();
    this.passiveUpgrades = this.upgradeService.getPassiveUpgrades();
    this.prestigeUpgrades = this.upgradeService.getPrestigeUpgrades();

    this.generators = this.passiveService.getGenerators();
  }

  currentBasicUpgradeName: string = 'Hover and upgrade to see its description';
  currentBasicUpgradeDesc: string = '';
  
  ChangeBasicUpgradesText(upgradeNumber: number) {

    const upgrade = this.basicUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentBasicUpgradeName = upgrade.name;
    this.currentBasicUpgradeDesc = upgrade.description;
  }

  currentPassiveUpgradeName: string = 'Hover and upgrade to see its description';
  currentPassiveUpgradeDesc: string = '';

  ChangePassiveUpgradesText(upgradeNumber: number) {

    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentPassiveUpgradeName = upgrade.name;
    this.currentPassiveUpgradeDesc = upgrade.description;
  }

  currentPrestigeUpgradeName: string = 'Hover and upgrade to see its description';
  currentPrestigeUpgradeDesc: string = '';

  ChangePrestigeUpgradesText(upgradeNumber: number) {

    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentPrestigeUpgradeName = upgrade.name;
    this.currentPrestigeUpgradeDesc = upgrade.description;
  }

  getNumberToChar(number: number): string {
    return String.fromCharCode(number + 65);
  }

  GetUpgrade(upgradeNumber: number) {
    const upgrade = this.basicUpgrades.find((x) => x.id == upgradeNumber);
    console.log(upgradeNumber);
    if (!upgrade) return;
    if (
      this.GameService.game.upgrades.find((x) => x.id == upgradeNumber) ==
        undefined &&
      this.GameService.game.points >= upgrade.cost
    ) {
      this.GameService.game.points -= upgrade.cost;
      this.GameService.game.upgrades.push(upgrade);
      if (upgradeNumber == 4) {
        this.GameService.game.passiveGenerators.push(
          this.generators.find((x) => x.id == 1)!
        );
        this.GameService.game.passiveGenerators.find((x) => x.id == 1)!
          .amountBought++;
        this.GameService.game.passiveGenerators.find((x) => x.id == 1)!
          .amountGained++;
      }
    }
  }

  GetPassiveUpgrade(upgradeNumber: number) {
    const upgrade = this.upgradeService
      .getPassiveUpgrades()
      .find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      this.GameService.game.passiveUpgrades.find((x) => x.id == upgradeNumber) ==
        undefined &&
      this.GameService.game.passivePoints >= upgrade.cost
    ) {
      this.GameService.game.passivePoints -= upgrade.cost;
      this.GameService.game.passiveUpgrades.push(upgrade);
      if (upgradeNumber == 4) this.GameService.game.passiveLength++;
    }
  }

  GetPrestigeUpgrade(upgradeNumber: number) {
    const upgrade = this.upgradeService
      .getPrestigeUpgrades()
      .find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      this.GameService.game.passiveUpgrades.find((x) => x.id == upgradeNumber) ==
        undefined &&
      this.GameService.game.prestigePoints >= upgrade.cost
    ) {
      this.GameService.game.prestigePoints -= upgrade.cost;
      this.GameService.game.prestigeUpgrades.push(upgrade);
      if (upgradeNumber == 1) this.GameService.game.rollsAmount += 2;
    }
  }

  isUpgradeActive(index: number):  boolean {
    return this.GameService.game.upgrades.some((x) => x.id == index)
  }

  isPassiveUpgradeActive(index: number):  boolean {
    return this.GameService.game.passiveUpgrades.some((x) => x.id == index)
  }

  isPrestigeUpgradeActive(index: number):  boolean {
    return this.GameService.game.prestigeUpgrades.some((x) => x.id == index)
  }
}
