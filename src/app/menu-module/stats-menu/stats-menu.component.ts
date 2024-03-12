import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { interval } from 'rxjs';
import { Game } from 'src/app/classes/game';
import { ChartService } from 'src/app/services/chart.service';
import { GameService } from 'src/app/services/game.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats-menu',
  templateUrl: './stats-menu.component.html',
  styleUrls: ['./stats-menu.component.scss'],
})
export class StatsMenuComponent implements AfterViewInit{
  gameStats: Game = new Game(0, 'Current');
  private pieBonusChart: Chart | undefined;

  constructor(private statsService: StatsService, private chartService: ChartService) {
    Chart.register(...registerables)
    interval(50).subscribe(() => {
      this.pieBonusChart = chartService.pieBonusChart;
    })
    this.statsService.gameStats$.subscribe((game) => {
      this.gameStats = game;
    });
    
  }

  ngAfterViewInit(){
    const ctxMulti = document.getElementById('pieBonusChart') as HTMLCanvasElement;
    this.chartService.initializeStatsMultiChart(ctxMulti);
    const ctxSums = document.getElementById('pieSumsBonusChart') as HTMLCanvasElement;
    this.chartService.initializeStatsSumsChart(ctxSums);
  }

  getMultiUpgradesStat(): string {
    const mu1 =
      this.gameStats.multiUpgrades.find((mu) => mu.id === 'MultiUpgradePoints')
        ?.amountBought || 0;
    const mu2 =
      this.gameStats.multiUpgrades.find((mu) => mu.id === 'MultiUpgradeWords')
        ?.amountBought || 0;
    const mu3 =
      this.gameStats.multiUpgrades.find(
        (mu) => mu.id === 'MultiUpgradePointsMult'
      )?.amountBought || 0;
    return `${mu1} - ${mu2} - ${mu3}`;
  }
}
