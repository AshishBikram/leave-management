import { Component } from '@angular/core';
import {ChartOptions} from "chart.js/auto";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Annual' ], [ 'Sick' ], ['Maternity'],['Paternity']  ];
  public pieChartDatasets = [ {
    data: [ 40, 30, 20,10 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
