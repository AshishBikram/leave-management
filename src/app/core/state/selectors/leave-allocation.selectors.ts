import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLeaveAllocation from "@state/reducers/leave-allocation.reducers"

export const getLeaveAllocationState = createFeatureSelector<fromLeaveAllocation.State>('leaveAllocation');

export const loading = createSelector(
  getLeaveAllocationState,
  (state: fromLeaveAllocation.State) => state.loading
);

export const getLeaveAllocation = createSelector(
  getLeaveAllocationState,
  (state: fromLeaveAllocation.State) => state.leaveAllocation
);
