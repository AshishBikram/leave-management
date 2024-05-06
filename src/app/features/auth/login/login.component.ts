import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule, NgIf} from "@angular/common";
import {Navigation, Router, RouterLink} from "@angular/router";
import {UserService} from "@services/user/user.service";
import {UserType} from "@model/user/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  submit() {
    if(this.loginForm.valid){
      this.userService.login({
        email: this.loginForm.value.email ?? "",
        password: this.loginForm.value.password ?? ""
      }).subscribe(
        (res) => {
          localStorage.setItem("leave_application",JSON.stringify(res));
          this.routingLocation(res.user.role);
          this.snackBar.open("User Login successfully")
        },
        (error) => {
          this.snackBar.open("Error on Login")
        }
      )
    }
  }
  routingLocation(role: string){
    console.log(role, UserType.Manager.toString())
    switch (role){
      case UserType.Employee.toString():
        this.router.navigateByUrl('/leave-balance');
        break
      case UserType.HR.toString():
        this.router.navigate(['/home']);
        break
      case UserType.Manager.toString():
        this.router.navigateByUrl("/leave-request");
        break
      default:
        this.router.navigateByUrl('/home');
    }
  }
}
