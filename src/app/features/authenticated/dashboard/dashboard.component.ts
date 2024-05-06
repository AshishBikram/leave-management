import { Component } from '@angular/core';
import {ContentLayoutComponent} from "@shared/layout/content-layout/content-layout.component";
import {GraphViewerComponent} from "./components/graph-viewer/graph-viewer.component";
import {LeaveOverviewComponent} from "./components/leave-overview/leave-overview.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ContentLayoutComponent,
    GraphViewerComponent,
    LeaveOverviewComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
