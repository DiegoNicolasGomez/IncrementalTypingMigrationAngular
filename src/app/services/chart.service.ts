import { Injectable } from '@angular/core';
import { ChartUtils, ChartUtilsConfig } from '../utils/chartUtils';
import { interval } from 'rxjs';
import { Chart, ChartConfiguration } from 'chart.js';
import { DateTime } from 'luxon';
import { MarketService } from './market.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  marketChart: Chart | undefined;
  private letterBonus: number[] = [];
  private componentActive: boolean = false;

  chartUtils = new ChartUtils();

  constructor(private marketService: MarketService, private router: Router) {
    this.initializeChart();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.componentActive = event.url.includes('marketMenu');
      }
    });

    this.marketService.getLettersBonus().subscribe((letterBonus) => {
      this.letterBonus = letterBonus;

      if(!this.componentActive) return
      // Update the chart data
      this.marketChart!.data.labels!.push(
        `${DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)}`
      );

      for (let index = 0; index < this.letterBonus.length; index++) {
        this.marketChart!.data.datasets[index].data.push(
          this.letterBonus[index]
        );
      }

      // Remove old data to keep a certain number of data points
      if (this.marketChart!.data.labels!.length > 100) {
        this.marketChart!.data.labels!.shift();
        this.marketChart!.data.datasets.forEach((dataset) => {
          dataset.data.shift();
        });
      }

      // Update the chart
      this.marketChart!.update();
    });
  }

  initializeChart() {
    const ctx = document.getElementById('marketChart') as HTMLCanvasElement;
    //"ctx" hace referencia al id del componente canvas

    const DATA_COUNT = 1;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const chartConfig: ChartUtilsConfig = {};
    const labels: string[] = [];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'a-e-i-o-u-l-n-s-t-r',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.red,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.red,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'd-g',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.orange,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.orange,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'b-c-m-p',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.yellow,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.yellow,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'f-h-v-w-y',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.green,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.green,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'k',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.blue,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.blue,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'j-x',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.purple,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.purple,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'q-z',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.grey,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.grey,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
        {
          label: 'Special Characters',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.lightblue,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.lightblue,
            0.5
          ),
          fill: true,
          color: "rgb(20, 20, 20)"
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 20,
                family: "Montserrat", 
              }
            }
          },
          title: {
            display: true,
            text: 'The Word Market',
            font: {
              size: 30,
              family: "Montserrat",
            }
          },
        },
      },
    };

    this.marketChart = new Chart(ctx, config);
  }
}
