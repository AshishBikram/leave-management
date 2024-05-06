import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLeaveRequest from "@state/reducers/leave-request.reducers"

export const getLeaveRequestState = createFeatureSelector<fromLeaveRequest.State>('leaveRequest');

export const loading = createSelector(
  getLeaveRequestState,
  (state: fromLeaveRequest.State) => state.loading
);

export const getLeaveRequest = createSelector(
  getLeaveRequestState,
  (state: fromLeaveRequest.State) => state.leaveRequest
);
