import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddEditDialogBoxComponent} from "./components/add-edit-dialog-box/add-edit-dialog-box.component";
import {select, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {Menu} from "@model/menu/menu";
import * as LeaveTypeActions from "@state/actions/leave-type.actions";
import * as LeaveTypeSelector from "@state/selectors/leave-type.selectors";
import {LeaveType} from "@model/leave-type/leave-type";
import {getLeaveType} from "@state/selectors/leave-type.selectors";
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderRowDef,
  MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import * as fromLeaveType from "@state/actions/leave-type.actions";

@Component({
  selector: 'app-leave-types',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    AsyncPipe,
    NgIf,
    MatColumnDef,
    NgForOf,
    MatIcon,
    MatIconButton,
    NgStyle
  ],
  templateUrl: './leave-types.component.html',
  styleUrl: './leave-types.component.css',
})
export class LeaveTypesComponent implements OnInit, AfterViewInit{
  constructor(public dialog: MatDialog, private readonly store: Store) {}

  loadLeaveType$: Observable<LeaveType[]> = of([]);
  isLoading$: Observable<boolean> = of(false);

  ngOnInit() {
    this.store.dispatch(LeaveTypeActions.loadLeaveType());
  }

  ngAfterViewInit() {
    this.isLoading$ = this.store.pipe(select(LeaveTypeSelector.loading))
    this.loadLeaveType$ = this.store.select(LeaveTypeSelector.getLeaveType)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditDialogBoxComponent, {
      width: "300px",
      height: "200px",
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  delete(leaveType: LeaveType) {
    this.store.dispatch(fromLeaveType.deleteLeaveType({leaveType: leaveType}))
  }

  openUpdateDialog(leaveType: LeaveType): void{
    const dialogRef = this.dialog.open(AddEditDialogBoxComponent, {
      width: "300px",
      height: "200px",
      data: {...leaveType}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
