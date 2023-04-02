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
import { ExponentialNumberPipe } from '../pipes/exponential-number.pipe';

export const routes: Routes = [
  { path: '', component: ActiveMenuComponent },
  { path: 'activeMenu', component: ActiveMenuComponent },
  { path: 'passiveMenu', component: PassiveMenuComponent },
  { path: 'upgradesMenu', component: UpgradesMenuComponent },
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
    ExponentialNumberPipe
  ],
  imports: [CommonModule], 
  exports: [ AchievementsMenuComponent,
    ActiveMenuComponent,
    CardsMenuComponent,
    ChallengesMenuComponent,
    OptionsMenuComponent,
    PassiveMenuComponent,
    PrestigeMenuComponent,
    UpgradesMenuComponent,
    StatsMenuComponent,
    ExponentialNumberPipe]
})
export class MenuModuleModule {}
