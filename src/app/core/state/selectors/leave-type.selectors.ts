import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLeaveType from "@state/reducers/leave-type.reducers"

export const getLeaveTypeState = createFeatureSelector<fromLeaveType.State>('leaveType');

export const loading = createSelector(
  getLeaveTypeState,
  (state: fromLeaveType.State) => state.loading
);

export const getLeaveType = createSelector(
  getLeaveTypeState,
  (state: fromLeaveType.State) => state.leaveType
);
