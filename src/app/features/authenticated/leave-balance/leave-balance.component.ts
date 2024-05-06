import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {LeaveBalance} from "@model/leave-balance/leave-balance";
import {select, Store} from "@ngrx/store";
import * as LeaveBalanceActions from "@state/actions/leave-balance.actions";
import {TokenService} from "@services/token/token.service";
import * as LeaveBalanceSelector from "@state/selectors/leave-balance.selectors";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-leave-balance',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon,
    MatIconButton,
    MatTooltip,
    NgForOf,
    NgIf
  ],
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent implements OnInit {
  isLoading$: Observable<boolean> = of(false);
  loadLeaveBalance$: Observable<LeaveBalance[]> = of([]);
  userId: number;

  constructor(private store: Store, private tokenService: TokenService) {
    this.userId = this.tokenService.getUserInfo().id
  }

  ngOnInit() {
    this.store.dispatch(LeaveBalanceActions.loadLeaveBalance({
        leaveBalance: {
          userId: this.userId
        }
      }
    ));
    this.isLoading$ = this.store.pipe(select(LeaveBalanceSelector.loading))
    this.loadLeaveBalance$ = this.store.select(LeaveBalanceSelector.getLeaveBalances)
  }
}
