import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LeaveType} from "@model/leave-type/leave-type";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromLeaveType from "@state/actions/leave-type.actions"

@Component({
  selector: 'app-add-edit-dialog-box',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-dialog-box.component.html',
  styleUrl: './add-edit-dialog-box.component.css'
})
export class AddEditDialogBoxComponent implements OnInit {

  constructor(
    private readonly store: Store,
    public dialogRef: MatDialogRef<AddEditDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeaveType,
  ) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  leaveType = new FormGroup({
    name: new FormControl(this?.data?.name ?? "", [Validators.required]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.leaveType.valid) {
      if (this.data?.id) {
        this.store.dispatch(fromLeaveType.updateLeaveType({
          leaveType: {
            name: this.leaveType.value.name ?? "",
            id: this.data.id,
          }
        }))
      } else {
        this.store.dispatch(fromLeaveType.createLeaveType({
          leaveType: {
            name: this.leaveType.value.name ?? "",
          }
        }))
      }
      this.onNoClick();
    }
  }
}
