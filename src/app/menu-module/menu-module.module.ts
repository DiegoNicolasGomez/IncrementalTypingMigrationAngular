import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsMenuComponent } from './achievements-menu/achievements-menu.component';
import { ActiveMenuComponent } from './active-menu/active-menu.component';
import { CardsMenuComponent } from './cards-menu/cards-menu.component';
import { ChallengesMenuComponent } from './challenges-menu/challenges-menu.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { PassiveMenuComponent } from './passive-menu/passive-menu.component';
import { PrestigeMenuComponent } from './prestige-menu/prestige-menu.component';
import { UpgradesMenuComponent } from './upgrades-menu/upgrades-menu.component';

@NgModule({
  declarations: [
    AchievementsMenuComponent,
    ActiveMenuComponent,
    CardsMenuComponent,
    ChallengesMenuComponent,
    OptionsMenuComponent,
    PassiveMenuComponent,
    PrestigeMenuComponent,
    UpgradesMenuComponent,
  ],
  imports: [CommonModule], 
  exports: [ AchievementsMenuComponent,
    ActiveMenuComponent,
    CardsMenuComponent,
    ChallengesMenuComponent,
    OptionsMenuComponent,
    PassiveMenuComponent,
    PrestigeMenuComponent,
    UpgradesMenuComponent,]
})
export class MenuModuleModule {}
