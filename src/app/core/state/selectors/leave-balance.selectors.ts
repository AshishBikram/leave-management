import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLeaveBalanceReducer from "@state/reducers/leave-balance.reducers"

export const getLeaveBalanceState = createFeatureSelector<fromLeaveBalanceReducer.State>('leaveBalance');

export const loading = createSelector(
  getLeaveBalanceState,
  (state: fromLeaveBalanceReducer.State) => state.loading
);

export const getLeaveBalances = createSelector(
  getLeaveBalanceState,
  (state: fromLeaveBalanceReducer.State) => state.leaveBalance
);
