import { createReducer, on } from '@ngrx/store';
import {LeaveBalance} from "@model/leave-balance/leave-balance";
import * as LeaveBalanceActions from '@core/state/actions/leave-balance.actions';


export interface State {
  leaveBalance: LeaveBalance[],
  loading : boolean,
  error: any,
}

export const initialState: State = {
  leaveBalance: [],
  loading : false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LeaveBalanceActions.loadLeaveBalance, (state) => ({...state,loading: false, error:null})),
  on(LeaveBalanceActions.loadLeaveBalanceSuccess, (state, { data }) => ({
    ...state,
    leaveBalance:data,
    loading: true,
    error: null
  })),
  on(LeaveBalanceActions.loadLeaveBalanceFailure, (state,{error}) => ({...state,loading: false, error}))
);
