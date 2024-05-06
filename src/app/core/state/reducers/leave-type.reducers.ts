import {LeaveType} from "@model/leave-type/leave-type";
import {createReducer, on} from "@ngrx/store";
import * as LeaveTypeActions from "@state/actions/leave-type.actions";

export const leaveTypeFeatureKey = 'leaveType';

export interface State {
  leaveType: LeaveType[],
  loading: boolean,
  error: any,
}

export const initialState: State = {
  leaveType: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LeaveTypeActions.loadLeaveType, (state) => ({...state, loading: false, error: null})),
  on(LeaveTypeActions.loadLeaveTypeSuccess, (state, {data}) => ({
    ...state,
    leaveType: data,
    loading: true,
    error: null
  })),
  on(LeaveTypeActions.loadLeaveTypeFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveTypeActions.createLeaveType, (state) => ({...state, loading: false, error: null})),
  on(LeaveTypeActions.createLeaveTypeSuccess, (state, {data}) => ({
    ...state,
    leaveType: [data, ...state.leaveType],
    loading: true,
    error: null
  })),
  on(LeaveTypeActions.createLeaveTypeFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveTypeActions.updateLeaveType, (state) => ({...state, loading: false, error: null})),
  on(LeaveTypeActions.updateLeaveTypeSuccess, (state, {data}) => ({
    ...state,
    leaveType: state.leaveType.map((b) => b.id === data.id ? data : b),
    loading: true,
    error: null
  })),
  on(LeaveTypeActions.createLeaveTypeFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveTypeActions.deleteLeaveType, (state) => ({...state, loading: false, error: null})),
  on(LeaveTypeActions.deleteLeaveTypeSuccess, (state, {data}) => ({
    ...state,
    leaveType: state.leaveType.filter((b) => b.id !== data.id),
    loading: true,
    error: null
  })),
  on(LeaveTypeActions.createLeaveTypeFailure, (state, {error}) => ({...state, loading: false, error}))
);
