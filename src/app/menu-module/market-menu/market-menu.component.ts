import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DateTime } from 'luxon';
import { interval } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { MarketService } from 'src/app/services/market.service';
import { ChartUtils, ChartUtilsConfig } from 'src/app/utils/chartUtils';

@Component({
  selector: 'app-market-menu',
  templateUrl: './market-menu.component.html',
  styleUrls: ['./market-menu.component.scss'],
})
export class MarketMenuComponent implements OnInit, OnDestroy {
  private marketChart: Chart | undefined;


  constructor(private chartDataService: ChartService, private marketService: MarketService) {
    Chart.register(...registerables);

    interval(50).subscribe(() => {
      this.marketChart = chartDataService.marketChart;
    })

  }

  chartUtils = new ChartUtils();

  ngOnInit() {
    this.initializeChart();
  }

  ngOnDestroy() {
    if (this.marketChart) {
      this.marketChart.destroy();
    }
  }

  private initializeChart() {
    this.chartDataService.initializeChart();
  }
}
