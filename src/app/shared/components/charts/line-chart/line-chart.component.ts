import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import Chart, {ChartConfiguration, ChartOptions} from 'chart.js/auto';
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    BaseChartDirective,
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent{

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
    ],
    datasets: [
      {
        data: [ 120, 135, 150, 145, 160],
        fill: true,
        tension: 0.5,
        borderColor: 'white',
        backgroundColor: 'gray'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = false;
}
