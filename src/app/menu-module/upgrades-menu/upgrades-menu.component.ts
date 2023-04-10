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

  getUpgrade(upgradeNumber: number) {
    this.upgradeService.getUpgrade(upgradeNumber);
  }

  getPassiveUpgrade(upgradeNumber: number) {
    this.upgradeService.getPassiveUpgrade(upgradeNumber);
  }

  getPrestigeUpgrade(upgradeNumber: number) {
    this.upgradeService.getPrestigeUpgrade(upgradeNumber);
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
