import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration} from "chart.js/auto";
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
    imports: [
        CommonModule,
        RouterOutlet,
        BaseChartDirective,
    ],
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'HR', 'IT', 'Finance', 'Sales' ],
    datasets: [
      { data: [ 80 , 120, 100, 140 ] },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

}
