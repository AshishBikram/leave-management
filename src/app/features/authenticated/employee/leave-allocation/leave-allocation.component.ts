import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import {Observable, of, pipe, switchMap, take} from "rxjs";
import {LeaveAllocation, LeaveAllocationResponse} from "@model/leave-allocation/leave-allocation";
import * as LeaveAllocationActions from "@state/actions/leave-allocation.actions";
import * as LeaveAllocationSelector from "@state/selectors/leave-allocation.selectors";
import {
  AddEditDialogBoxComponent
} from "../../leave-types/components/add-edit-dialog-box/add-edit-dialog-box.component";
import * as fromLeaveAllocation from "@state/actions/leave-allocation.actions";
import {
  AddViewLeaveAllocationDialogComponent
} from "../components/add-view-leave-allocation-dialog/add-view-leave-allocation-dialog.component";
import {ActivatedRoute} from "@angular/router";
import * as LeaveTypeActions from "@state/actions/leave-type.actions";
import * as LeaveTypeSelector from "@state/selectors/leave-type.selectors";
import {LeaveType} from "@model/leave-type/leave-type";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-leave-allocation',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './leave-allocation.component.html',
  styleUrl: './leave-allocation.component.css'
})
export class LeaveAllocationComponent implements OnInit, AfterViewInit{
  userId: number = 0;
  loadLeaveAllocation$: Observable<LeaveAllocationResponse[]> = of([]);
  isLoading$: Observable<boolean> = of(false);
  loadLeaveType$: Observable<LeaveType[]> = of([]);
  filteredLeaveTypes$: Observable<LeaveType[]> = of([]);
  constructor(public dialog: MatDialog, private readonly store: Store, private router: ActivatedRoute) {
  }


  ngOnInit() {
    this.router.params.subscribe(params => {
      this.userId = params['employeeId']
    });
    this.store.dispatch(LeaveTypeActions.loadLeaveType());
    this.store.dispatch(LeaveAllocationActions.loadLeaveAllocation());
  }

  ngAfterViewInit() {
    this.isLoading$ = this.store.pipe(select(LeaveAllocationSelector.loading))
    this.loadLeaveAllocation$ = this.store.select(LeaveAllocationSelector.getLeaveAllocation)
    this.loadLeaveType$ = this.store.select(LeaveTypeSelector.getLeaveType)
    this.filteredLeaveTypes$ = this.loadLeaveType$.pipe(
      switchMap(d => this.loadLeaveAllocation$.pipe(
        map(f => {
          return d.filter(d => {
            return f.findIndex(c => c.leaveTypeId === d.id) === -1
          })
        }),
    ))
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddViewLeaveAllocationDialogComponent, {
      width: "300px",
      height: "300px",
      data: {
        userId: this.userId,
        loadLeaveType$: this.filteredLeaveTypes$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  delete(leaveAllocation: LeaveAllocation) {
    this.store.dispatch(fromLeaveAllocation.deleteLeaveAllocation({leaveAllocation: leaveAllocation}))
  }

  openUpdateDialog(leaveAllocation: LeaveAllocation): void{
    const dialogRef = this.dialog.open(AddViewLeaveAllocationDialogComponent, {
      width: "300px",
      height: "300px",
      data: {
        userId: this.userId,
        loadLeaveType$: this.loadLeaveType$,
        leaveAllocation: leaveAllocation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
