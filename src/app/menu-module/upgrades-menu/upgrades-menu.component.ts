import { Component, OnInit } from '@angular/core';
import { PassiveService } from 'src/app/services/passive.service';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { GameService } from 'src/app/services/game.service';
import { eIdUpgrade, Upgrade } from '../../classes/upgrade';
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
  intermediateUpgrades: Upgrade[] = [];
  advancedUpgrades: Upgrade[] = [];
  passiveUpgrades: Upgrade[] = [];
  prestigeUpgrades: Upgrade[] = [];

  generators: Generator[] = [];

  ngOnInit() {
    this.basicUpgrades = this.upgradeService.getBasicUpgrades();
    this.intermediateUpgrades = this.upgradeService.getIntermediateUpgrades();
    this.advancedUpgrades = this.upgradeService.getAdvancedUpgrades();
    this.passiveUpgrades = this.upgradeService.getPassiveUpgrades();
    this.prestigeUpgrades = this.upgradeService.getPrestigeUpgrades();

    this.generators = this.passiveService.getGenerators();
  }

  currentBasicUpgradeName: string = 'Hover and upgrade to see its description';
  currentBasicUpgradeDesc: string = '';
  currentBasicUpgradeCost: number = 0;

  ChangeBasicUpgradesText(upgradeNumber: eIdUpgrade) {
    const upgrade = this.basicUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentBasicUpgradeName = upgrade.name;
    this.currentBasicUpgradeDesc = upgrade.description;
    this.currentBasicUpgradeCost = upgrade.cost;
  }

  currentIntermediateUpgradeName: string =
    'Hover and upgrade to see its description';
  currentIntermediateUpgradeDesc: string = '';
  currentIntermediateUpgradeCost: number = 0;

  ChangeIntermediateUpgradesText(upgradeNumber: eIdUpgrade) {
    const upgrade = this.intermediateUpgrades.find(
      (x) => x.id == upgradeNumber
    );
    if (!upgrade) return;

    this.currentIntermediateUpgradeName = upgrade.name;
    this.currentIntermediateUpgradeDesc = upgrade.description;
    this.currentIntermediateUpgradeCost = upgrade.cost;
  }

  currentAdvancedUpgradeName: string =
    'Hover and upgrade to see its description';
  currentAdvancedUpgradeDesc: string = '';
  currentAdvancedUpgradeCost: number = 0;

  ChangeAdvancedUpgradesText(upgradeNumber: eIdUpgrade) {
    const upgrade = this.advancedUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentAdvancedUpgradeName = upgrade.name;
    this.currentAdvancedUpgradeDesc = upgrade.description;
    this.currentAdvancedUpgradeCost = upgrade.cost;
  }

  currentPassiveUpgradeName: string =
    'Hover and upgrade to see its description';
  currentPassiveUpgradeDesc: string = '';
  currentPassiveUpgradeCost: number = 0;

  ChangePassiveUpgradesText(upgradeNumber: eIdUpgrade) {
    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentPassiveUpgradeName = upgrade.name;
    this.currentPassiveUpgradeDesc = upgrade.description;
    this.currentPassiveUpgradeCost = upgrade.cost;
  }

  currentPrestigeUpgradeName: string =
    'Hover and upgrade to see its description';
  currentPrestigeUpgradeDesc: string = '';
  currentPrestigeUpgradeCost: number = 0;

  ChangePrestigeUpgradesText(upgradeNumber: eIdUpgrade) {
    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;

    this.currentPrestigeUpgradeName = upgrade.name;
    this.currentPrestigeUpgradeDesc = upgrade.description;
    this.currentPrestigeUpgradeCost = upgrade.cost;
  }

  getNumberToChar(number: number): string {
    return String.fromCharCode(number + 65);
  }

  getUpgrade(upgradeNumber: eIdUpgrade) {
    this.upgradeService.getUpgrade(upgradeNumber);
  }

  getIntermediateUpgrade(upgradeNumber: eIdUpgrade) {
    this.upgradeService.getIntermediateUpgrade(upgradeNumber);
  }

  getAdvancedUpgrade(upgradeNumber: eIdUpgrade) {
    this.upgradeService.getAdvancedUpgrade(upgradeNumber);
  }

  getPassiveUpgrade(upgradeNumber: eIdUpgrade) {
    this.upgradeService.getPassiveUpgrade(upgradeNumber);
  }

  getPrestigeUpgrade(upgradeNumber: eIdUpgrade) {
    this.upgradeService.getPrestigeUpgrade(upgradeNumber);
  }

  isUpgradeActive(index: eIdUpgrade): boolean {
    return this.GameService.game.value.upgrades.some((x) => x.id == index);
  }

  isPassiveUpgradeActive(index: eIdUpgrade): boolean {
    return this.GameService.game.value.passiveUpgrades.some(
      (x) => x.id == index
    );
  }

  isPrestigeUpgradeActive(index: eIdUpgrade): boolean {
    return this.GameService.game.value.prestigeUpgrades.some(
      (x) => x.id == index
    );
  }

  isPassiveUpgradePurchased() {
    return this.GameService.game.value.upgrades.some(
      (x) => x.id == 'WordPassiveEnhancer'
    );
  }

  isEveryBasicUpgradePurchased() {
    return this.basicUpgrades
      .map((x) => x.id)
      .every((u) =>
        this.GameService.game.value.upgrades.map((x) => x.id).includes(u)
      );
  }

  isEveryIntermediateUpgradePurchased() {
    return this.intermediateUpgrades
      .map((x) => x.id)
      .every((u) =>
        this.GameService.game.value.upgrades.map((x) => x.id).includes(u)
      );
  }

  hasPrestigePoints() {
    return this.GameService.game.value.prestigePoints > 0;
  }

  hasAllBasicUpgrades() {
    return (
      this.GameService.game.value.upgrades.length >= this.basicUpgrades.length
    );
  }

  hasAllIntermediateUpgrades() {
    return (
      this.GameService.game.value.upgrades.length >=
      this.basicUpgrades.length + this.intermediateUpgrades.length
    );
  }

  hasAllAdvancedUpgrades() {
    return (
      this.GameService.game.value.upgrades.length >=
      this.basicUpgrades.length +
        this.intermediateUpgrades.length +
        this.advancedUpgrades.length
    );
  }

  hasAllPassiveUpgrades() {
    return (
      this.GameService.game.value.passiveUpgrades.length ===
      this.upgradeService.getPassiveUpgrades().length
    );
  }

  hasAllPrestigeUpgrades() {
    return (
      this.GameService.game.value.prestigeUpgrades.length ===
      this.upgradeService.getPrestigeUpgrades().length
    );
  }
}
