import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCard} from "@angular/material/card";
import {Observable, of} from "rxjs";
import {LeaveRequestResponse} from "@model/leave-request/leave-request";
import * as LeaveRequestActions from "@state/actions/leave-request.actions";
import * as LeaveRequestSelector from "@state/selectors/leave-request.selectors";
import {Store} from "@ngrx/store";
import {LeaveType} from "@model/leave-type/leave-type";
import * as LeaveTypeActions from "@state/actions/leave-type.actions";
import * as LeaveTypeSelector from "@state/selectors/leave-type.selectors";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DepartmentType, UserType} from "@model/user/user";
import dayjs from "dayjs";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {generateRangeOfDates} from "@core/utils/date";

@Component({
  selector: 'app-leave-overview',
  standalone: true,
  imports: [MatTabsModule, MatCard, AsyncPipe, FormsModule, MatError, MatFormField, MatLabel, MatOption, MatSelect, NgIf, ReactiveFormsModule, DatePipe, MatIcon, MatIconButton, NgForOf],
  templateUrl: './leave-overview.component.html',
  styleUrl: './leave-overview.component.css'
})
export class LeaveOverviewComponent implements OnInit{
  showTable: boolean = false;
  loadLeaveRequest!:LeaveRequestResponse[];
  leaveFilterRequestList!: LeaveRequestResponse[];
  loadLeaveType$: Observable<LeaveType[]> = of([]);
  department!: DepartmentType;
  leaveTypeId!: number;

  constructor(private readonly store: Store) {
  }
  ngOnInit() {
    this.store.dispatch(LeaveRequestActions.loadLeaveRequest({leaveRequest: {}}));
    this.store.dispatch(LeaveTypeActions.loadLeaveType());
    this.loadLeaveType$ = this.store.select(LeaveTypeSelector.getLeaveType)
    this.store.select(LeaveRequestSelector.getLeaveRequest).subscribe(d => {
      this.loadLeaveRequest = d;
      this.filterData();
    })
  }

  filterData(){
    const date = !this.showTable ? dayjs().format("YYYY-MM-DD").toString() : dayjs().add(1,"days").format("YYYY-MM-DD").toString();
    this.leaveFilterRequestList = this.loadLeaveRequest.filter(d => {
      const dataRange = generateRangeOfDates(d.fromDate, d.toDate);
      return dataRange.includes(date)
    })
      .filter(d => this.leaveTypeId ? this.leaveTypeId === d.leaveTypeId : true)
      .filter(d => this.department ? this.department === d.user.department: true)
  }

  changeTableView() {
    this.showTable = !this.showTable;
    console.log(this.showTable);
    this.filterData()
  }

  protected readonly DepartmentType = DepartmentType;
  protected readonly Object = Object;
  protected readonly dayjs = dayjs;
  protected readonly UserType = UserType;
}
