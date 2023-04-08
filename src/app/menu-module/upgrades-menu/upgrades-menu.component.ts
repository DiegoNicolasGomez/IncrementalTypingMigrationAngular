import { Component, OnInit } from '@angular/core';
import { PassiveService } from 'src/app/services/passive.service';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { GameService } from 'src/app/services/game.service';
import { Upgrade } from '../../classes/upgrade';
import { Generator } from '../../classes/generator';
import { MenuService } from 'src/app/services/menu.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-upgrades-menu',
  templateUrl: './upgrades-menu.component.html',
  styleUrls: ['./upgrades-menu.component.scss'],
})
export class UpgradesMenuComponent implements OnInit {
  constructor(
    private upgradeService: UpgradeService,
    private passiveService: PassiveService,
    private GameService: GameService,
    private menuService: MenuService,
    private layoutService: LayoutService
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
  currentBasicUpgradeCost: string = 'Cost: -';
  
  ChangeBasicUpgradesText(upgradeNumber: number) {

    const upgrade = this.basicUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentBasicUpgradeName = upgrade.name;
    this.currentBasicUpgradeDesc = upgrade.description;
    this.currentBasicUpgradeCost = `Cost: ${upgrade.cost}`;
  }

  currentPassiveUpgradeName: string = 'Hover and upgrade to see its description';
  currentPassiveUpgradeDesc: string = '';
  currentPassiveUpgradeCost: string = 'Cost: -';

  ChangePassiveUpgradesText(upgradeNumber: number) {

    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentPassiveUpgradeName = upgrade.name;
    this.currentPassiveUpgradeDesc = upgrade.description;
    this.currentPassiveUpgradeCost = `Cost: ${upgrade.cost}`;
  }

  currentPrestigeUpgradeName: string = 'Hover and upgrade to see its description';
  currentPrestigeUpgradeDesc: string = '';
  currentPrestigeUpgradeCost: string = 'Cost: -';

  ChangePrestigeUpgradesText(upgradeNumber: number) {

    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentPrestigeUpgradeName = upgrade.name;
    this.currentPrestigeUpgradeDesc = upgrade.description;
    this.currentPrestigeUpgradeCost = `Cost: ${upgrade.cost}`;
  }

  getNumberToChar(number: number): string {
    return String.fromCharCode(number + 65);
  }

  GetUpgrade(upgradeNumber: number) {
    const upgrade = this.basicUpgrades.find((x) => x.id == upgradeNumber);
    console.log(upgradeNumber);
    if (!upgrade) return;
    if (
      !this.GameService.game.value.upgrades.some((x) => x.id == upgradeNumber) &&
      this.GameService.game.value.points >= upgrade.cost
    ) {
      this.GameService.updatePoints(-upgrade.cost);
      this.GameService.addUpgrade(upgrade);
      if(upgradeNumber == 3) {
        this.layoutService.setLettersPerSecondVisibility(true);
      }
      if (upgradeNumber == 4) {
        this.GameService.addGenerator(this.generators.find((x) => x.id == 1)!)
        this.GameService.buyGenerator(1);
        this.menuService.updateNavbarItem('passive');
      }
      if(upgradeNumber == 9) {
        this.menuService.updateNavbarItem('cards');
      }
      if(upgradeNumber == 11) {
        this.menuService.updateNavbarItem('challenges');
      }
    }
  }

  GetPassiveUpgrade(upgradeNumber: number) {
    const upgrade = this.upgradeService
      .getPassiveUpgrades()
      .find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      this.GameService.game.value.passiveUpgrades.some((x) => x.id == upgradeNumber) &&
      this.GameService.game.value.passivePoints >= upgrade.cost
    ) {
      this.GameService.updatePassivePoints(-upgrade.cost);
      this.GameService.addPassiveUpgrade(upgrade);
      if (upgradeNumber == 4) this.GameService.updatePassiveLength(1);
    }
  }

  GetPrestigeUpgrade(upgradeNumber: number) {
    const upgrade = this.upgradeService
      .getPrestigeUpgrades()
      .find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      !this.GameService.game.value.passiveUpgrades.some((x) => x.id == upgradeNumber)  &&
      this.GameService.game.value.prestigePoints >= upgrade.cost
    ) {
      this.GameService.updatePrestigePoints(-upgrade.cost);
      this.GameService.addPrestigeUpgrade(upgrade);
      if (upgradeNumber == 1) this.GameService.updateRollsAmount(2);
    }
  }

  isUpgradeActive(index: number):  boolean {
    return this.GameService.game.value.upgrades.some((x) => x.id == index)
  }

  isPassiveUpgradeActive(index: number):  boolean {
    return this.GameService.game.value.passiveUpgrades.some((x) => x.id == index)
  }

  isPrestigeUpgradeActive(index: number):  boolean {
    return this.GameService.game.value.prestigeUpgrades.some((x) => x.id == index)
  }
}
