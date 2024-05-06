import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf, NgStyle} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {Observable, of} from "rxjs";
import {LeaveType} from "@model/leave-type/leave-type";
import * as fromLeaveAllocation from "@state/actions/leave-allocation.actions"
import {LeaveAllocation} from "@model/leave-allocation/leave-allocation";


@Component({
  selector: 'app-add-view-leave-allocation-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: './add-view-leave-allocation-dialog.component.html',
  styleUrl: './add-view-leave-allocation-dialog.component.css'
})
export class AddViewLeaveAllocationDialogComponent{

  constructor(
    private readonly store: Store,
    public dialogRef: MatDialogRef<AddViewLeaveAllocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number, loadLeaveType$: Observable<LeaveType[]>, leaveAllocation?: LeaveAllocation },
  ) {
  }

  leaveAllocationForm = new FormGroup({
    leaveTypeId: new FormControl(this.data?.leaveAllocation?.leaveTypeId,[Validators.required]),
    days: new FormControl(this.data?.leaveAllocation?.days, [Validators.required]),
  });


  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    if(this.leaveAllocationForm.valid){
      if(!this.data.leaveAllocation){
        this.store.dispatch(fromLeaveAllocation.createLeaveAllocation({
          leaveAllocation: {
            userId: +this.data.userId,
            leaveTypeId: +(this?.leaveAllocationForm?.value?.leaveTypeId ?? 0),
            days: +(this.leaveAllocationForm.value.days ?? 0)
          }
        }))
      }else {
        this.store.dispatch(fromLeaveAllocation.updateLeaveAllocation({
          leaveAllocation: {
            id: +this.data.leaveAllocation.id,
            userId: +this.data.userId,
            leaveTypeId: +(this?.leaveAllocationForm?.value?.leaveTypeId ?? 0),
            days: +(this.leaveAllocationForm.value.days ?? 0)
          }
        }))
      }

      this.onNoClick()
    }
  }

}
