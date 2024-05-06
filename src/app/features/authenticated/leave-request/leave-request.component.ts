import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {
  AddEditLeaveRequestDialogComponent
} from "./components/add-edit-leave-request-dialog/add-edit-leave-request-dialog.component";
import {TokenService} from "@services/token/token.service";
import * as LeaveRequestActions from "@state/actions/leave-request.actions";
import * as LeaveRequestSelector from "@state/selectors/leave-request.selectors";
import {Observable, of} from "rxjs";
import {LeaveRequestResponse} from "@model/leave-request/leave-request";
import dayjs from "dayjs";
import {UserSignUpResponse, UserType} from "@model/user/user";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    NgStyle,
    DatePipe,
    MatTooltip
  ],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent implements OnInit{
  loadLeaveRequest$: Observable<LeaveRequestResponse[]> = of([]);
  userInfo: UserSignUpResponse;
  protected readonly dayjs = dayjs;

  constructor(public dialog: MatDialog, private readonly store: Store, private tokenService: TokenService) {
    this.userInfo = this.tokenService.getUserInfo()
  }

  ngOnInit() {
    this.store.dispatch(LeaveRequestActions.loadLeaveRequest({
        leaveRequest: this.userInfo.role !== UserType.Employee ? {} : {userId: this.userInfo.id}
      }
    ));
    this.loadLeaveRequest$ = this.store.select(LeaveRequestSelector.getLeaveRequest)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditLeaveRequestDialogComponent, {
      width: "400px",
      height: "400px",
      data: {
        userId: this.userInfo.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  delete(leaveRequest: LeaveRequestResponse) {
    this.store.dispatch(LeaveRequestActions.deleteLeaveRequest({leaveRequest: leaveRequest}))
  }

  openUpdateDialog(leaveRequestResponse: LeaveRequestResponse): void{
    const dialogRef = this.dialog.open(AddEditLeaveRequestDialogComponent, {
      width: "400px",
      height: "400px",
      data: {
        userId: this.userInfo.role === UserType.Employee ? this.userInfo.id : leaveRequestResponse.userId,
        leaveRequest: leaveRequestResponse
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  protected readonly UserType = UserType;
}
