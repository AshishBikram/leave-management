import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {DepartmentType, UserType} from "@model/user/user";
import {UserService} from "@services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  protected readonly Object = Object;
  protected readonly UserType = UserType;

  constructor(private userService: UserService,private snackBar: MatSnackBar, private router: Router) {
  }
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    department: new FormControl(DepartmentType.HR, [Validators.required]),
    role: new FormControl(UserType.HR, [Validators.required])
  });

  submit(){
    if(this.signUpForm.valid){
      this.userService.register({
        name: this.signUpForm.value.name ?? "",
        email: this.signUpForm.value.email ?? "",
        department: this.signUpForm.value.department ?? DepartmentType.HR,
        phoneNumber: this.signUpForm.value.phoneNumber ?? "",
        role: this.signUpForm.value.role ?? UserType.HR,
        password: this.signUpForm.value.password ?? ""
      }).subscribe(
        () => {
          this.snackBar.open("User signed up successfully",);
          this.router.navigate(['/']);
        })
    }
  }

  protected readonly DepartmentType = DepartmentType;
}
