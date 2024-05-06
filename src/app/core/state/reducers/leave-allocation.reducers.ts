import {LeaveAllocation, LeaveAllocationResponse} from "@model/leave-allocation/leave-allocation";
import {createReducer, on} from "@ngrx/store";
import * as LeaveAllocationActions from "@state/actions/leave-allocation.actions";

export const leaveAllocationFeatureKey = 'leaveAllocation';

export interface State {
  leaveAllocation: LeaveAllocationResponse[],
  loading: boolean,
  error: any,
}

export const initialState: State = {
  leaveAllocation: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LeaveAllocationActions.loadLeaveAllocation, (state) => ({...state, loading: false, error: null})),
  on(LeaveAllocationActions.loadLeaveAllocationSuccess, (state, {data}) => ({
    ...state,
    leaveAllocation: data,
    loading: true,
    error: null
  })),
  on(LeaveAllocationActions.loadLeaveAllocationFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveAllocationActions.createLeaveAllocation, (state) => ({...state, loading: false, error: null})),
  on(LeaveAllocationActions.createLeaveAllocationSuccess, (state, {data}) => ({
    ...state,
    leaveAllocation: [data, ...state.leaveAllocation],
    loading: true,
    error: null
  })),
  on(LeaveAllocationActions.createLeaveAllocationFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveAllocationActions.updateLeaveAllocation, (state) => ({...state, loading: false, error: null})),
  on(LeaveAllocationActions.updateLeaveAllocationSuccess, (state, {data}) => ({
    ...state,
    leaveAllocation: state.leaveAllocation.map((b) => b.id === data.id ? data : b),
    loading: true,
    error: null
  })),
  on(LeaveAllocationActions.updateLeaveAllocationFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveAllocationActions.deleteLeaveAllocation, (state) => ({...state, loading: false, error: null})),
  on(LeaveAllocationActions.deleteLeaveAllocationSuccess, (state, {data}) => ({
    ...state,
    leaveAllocation: state.leaveAllocation.filter((b) => b.id !== data.id),
    loading: true,
    error: null
  })),
  on(LeaveAllocationActions.createLeaveAllocationFailure, (state, {error}) => ({...state, loading: false, error}))
);
