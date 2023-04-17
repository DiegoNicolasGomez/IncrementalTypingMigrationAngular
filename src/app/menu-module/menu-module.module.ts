import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementsMenuComponent } from './achievements-menu/achievements-menu.component';
import { ActiveMenuComponent } from './active-menu/active-menu.component';
import { CardsMenuComponent } from './cards-menu/cards-menu.component';
import { ChallengesMenuComponent } from './challenges-menu/challenges-menu.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { PassiveMenuComponent } from './passive-menu/passive-menu.component';
import { PrestigeMenuComponent } from './prestige-menu/prestige-menu.component';
import { UpgradesMenuComponent } from './upgrades-menu/upgrades-menu.component';
import { StatsMenuComponent } from './stats-menu/stats-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ModulesMenuComponent } from './modules-menu/modules-menu.component';

export const routes: Routes = [
  { path: '', component: ActiveMenuComponent },
  { path: 'activeMenu', component: ActiveMenuComponent },
  { path: 'passiveMenu', component: PassiveMenuComponent },
  { path: 'upgradesMenu', component: UpgradesMenuComponent },
  { path: 'modulesMenu', component: ModulesMenuComponent },
  { path: 'prestigeMenu', component: PrestigeMenuComponent },
  { path: 'cardsMenu', component: CardsMenuComponent },
  { path: 'challengesMenu', component: ChallengesMenuComponent },
  { path: 'achievementsMenu', component: AchievementsMenuComponent },
  { path: 'statsMenu', component: StatsMenuComponent },
  { path: 'optionsMenu', component: OptionsMenuComponent },
];

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
    StatsMenuComponent,
    ModulesMenuComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    AchievementsMenuComponent,
    ActiveMenuComponent,
    CardsMenuComponent,
    ChallengesMenuComponent,
    OptionsMenuComponent,
    PassiveMenuComponent,
    PrestigeMenuComponent,
    UpgradesMenuComponent,
    StatsMenuComponent,
    ModulesMenuComponent,
  ],
})
export class MenuModuleModule {}
