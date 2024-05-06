import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as UserActions from "@state/actions/user.actions";
import * as UserSelectors from "@state/selectors/user.selectors";
import {UserSignUpResponse, UserType} from "@model/user/user";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {map} from "rxjs/operators";
import {MatTooltip} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    MatTooltip,
    RouterLink
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  users$ : Observable<UserSignUpResponse[]> = of([]);
  isLoading$: Observable<boolean> = of(false);

  constructor( private readonly store: Store, private router: Router){}

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUser({user:{role:UserType.Employee}}));
  }

  ngAfterViewInit() {
    this.isLoading$ = this.store.pipe(select(UserSelectors.loading))
    this.users$ = this.store.select(UserSelectors.getUsers)
  }

  navigateTo(employeeId: number){
    this.router.navigate(["employee" ,employeeId ,"leave-allocation"])
  }
}
