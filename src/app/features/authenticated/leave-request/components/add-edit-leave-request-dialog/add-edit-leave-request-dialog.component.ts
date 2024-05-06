import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import * as fromLeaveRequest from "@state/actions/leave-request.actions";
import * as LeaveRequestSelector from "@state/selectors/leave-request.selectors";
import dayjs from "dayjs";
import {LeaveRequestResponse, LeaveStatusType} from "@model/leave-request/leave-request";
import {provideNativeDateAdapter} from "@angular/material/core";
import * as LeaveBalanceActions from "@state/actions/leave-balance.actions";
import * as LeaveBalanceSelector from "@state/selectors/leave-balance.selectors";
import {LeaveBalance} from "@model/leave-balance/leave-balance";
import {generateRangeOfDates} from "@core/utils/date";
import {UserSignUpResponse, UserType} from "@model/user/user";
import {TokenService} from "@services/token/token.service";
import {NotificationService} from "@services/notification/notification.service";

export interface MatDialogAddEditType{
  userId: number,
  leaveRequest?: LeaveRequestResponse
}

@Component({
  selector: 'app-add-edit-leave-request-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatDatepickerModule,
    MatHint,
    MatFormFieldModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-edit-leave-request-dialog.component.html',
  styleUrl: './add-edit-leave-request-dialog.component.css'
})
export class AddEditLeaveRequestDialogComponent implements OnInit{
  loadLeaveBalance$!: Observable<LeaveBalance[]>;
  userInfo: UserSignUpResponse;
  constructor(
    private readonly store: Store,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<AddEditLeaveRequestDialogComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number, leaveRequest?: LeaveRequestResponse },
  ) {
    this.userInfo = this.tokenService.getUserInfo()
  }

  leaveRequestForm = new FormGroup({
    leaveTypeId: new FormControl(this?.data?.leaveRequest?.leaveTypeId ?? "",[Validators.required]),
    fromDate: new FormControl(new Date(this?.data?.leaveRequest?.fromDate ?? dayjs().add(1).toDate()),[Validators.required]),
    toDate: new FormControl(new Date(this?.data?.leaveRequest?.toDate ?? dayjs().add(1).toDate()),[Validators.required]),
    reason: new FormControl(this?.data?.leaveRequest?.reason ?? "",[Validators.required]),
    status: new FormControl(this?.data?.leaveRequest?.status ?? "")
  });

  ngOnInit() {
    this.store.dispatch(fromLeaveRequest.loadLeaveRequest({leaveRequest: {}}))
    this.store.dispatch(LeaveBalanceActions.loadLeaveBalance({
        leaveBalance: {
          userId: this.data.userId
        }
      }
    ));
    this.loadLeaveBalance$ = this.store.select(LeaveBalanceSelector.getLeaveBalances)
    console.log(this.userInfo.role, UserType.HR)
    if(this.userInfo.role !== UserType.Employee){
      this.leaveRequestForm.controls['status'].setValidators([Validators.required]);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    if(this.leaveRequestForm.valid){
      if(!this.data.leaveRequest){
        this.store.dispatch(fromLeaveRequest.createLeaveRequest({
          leaveRequest: {
            userId: this.data.userId,
            leaveTypeId: +(this.leaveRequestForm.value.leaveTypeId ?? 1),
            fromDate: dayjs(this.leaveRequestForm.value.fromDate).format("YYYY-MM-DD").toString(),
            toDate: dayjs(this.leaveRequestForm.value.toDate).format("YYYY-MM-DD").toString(),
            reason: this.leaveRequestForm.value.reason ?? "",
            status: this.leaveRequestForm.value.status as LeaveStatusType ?? LeaveStatusType.Pending,
          }
        }))
      }else {
        this.store.dispatch(fromLeaveRequest.updateLeaveRequest({
          leaveRequest: {
            id: this.data.leaveRequest.id,
            userId: this.data.userId,
            leaveTypeId: +(this.leaveRequestForm.value.leaveTypeId ?? 1),
            fromDate: dayjs(this.leaveRequestForm.value.fromDate).format("YYYY-MM-DD").toString(),
            toDate: dayjs(this.leaveRequestForm.value.toDate).format("YYYY-MM-DD").toString(),
            reason: this.leaveRequestForm.value.reason ?? "",
            status: this.leaveRequestForm.value.status as LeaveStatusType ?? LeaveStatusType.Pending,
          }
        }))
        if(this.userInfo.id !== this.data.userId){
          this.notificationService.sendNotification({
            userId: this.data.userId,
            status: this.leaveRequestForm.value.status ?? LeaveStatusType.Pending
          })
        }
      }
      this.onNoClick();
    }

  }
  checkDateAvailability(){
    if(this.leaveRequestForm.value.toDate && this.leaveRequestForm.value.toDate){
      this.store.select(LeaveRequestSelector.getLeaveRequest).subscribe(d => {
        this.checkDateLeaves(d)
      })
    }
  }
  checkDateLeaves(leaveRequestResponses: LeaveRequestResponse[]) {
    const dateRanges: string[] = generateRangeOfDates(this.leaveRequestForm.value.fromDate?.toDateString() ?? "" ,this.leaveRequestForm.value.toDate?.toDateString() ?? "")
    const length = leaveRequestResponses
      .filter(c => c.status === LeaveStatusType.Pending || c.status === LeaveStatusType.Approved)
      .filter(d => {
      const leaveDateRanges = generateRangeOfDates(d.fromDate, d.toDate)
      return dateRanges.find(d => leaveDateRanges.includes(d))
    }).length
    if(length > 5){
      alert("This dates has highest number of leaves applied.")
    }
  }

  protected readonly UserType = UserType;
  protected readonly Object = Object;
  protected readonly LeaveStatusType = LeaveStatusType;
}
