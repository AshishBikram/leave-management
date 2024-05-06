import { Component } from '@angular/core';
import {BarChartComponent} from "@shared/components/charts/bar-chart/bar-chart.component";
import {LineChartComponent} from "@shared/components/charts/line-chart/line-chart.component";
import {PieChartComponent} from "@shared/components/charts/pie-chart/pie-chart.component";

@Component({
  selector: 'app-graph-viewer',
  standalone: true,
  imports: [
    BarChartComponent,
    LineChartComponent,
    PieChartComponent
  ],
  templateUrl: './graph-viewer.component.html',
  styleUrl: './graph-viewer.component.css'
})
export class GraphViewerComponent {

}
