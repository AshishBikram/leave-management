import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as fromMenuReducer from './menu.reducers';
import * as fromLeaveTypeReducer from './leave-type.reducers';
import * as fromUserReducer from './user.reducers';
import * as fromLeaveAllocationReducer from './leave-allocation.reducers';
import * as fromLeaveRequestReducer from './leave-request.reducers';
import * as fromLeaveBalanceReducer from './leave-balance.reducers';


export interface State {
  menus : fromMenuReducer.State,
  leaveType: fromLeaveTypeReducer.State
  users: fromUserReducer.State,
  leaveAllocation: fromLeaveAllocationReducer.State,
  leaveRequest: fromLeaveRequestReducer.State,
  leaveBalance: fromLeaveBalanceReducer.State
}

export const reducers: ActionReducerMap<State> = {
  menus: fromMenuReducer.reducer,
  leaveType: fromLeaveTypeReducer.reducer,
  users: fromUserReducer.reducer,
  leaveAllocation: fromLeaveAllocationReducer.reducer,
  leaveRequest: fromLeaveRequestReducer.reducer,
  leaveBalance: fromLeaveBalanceReducer.reducer,
};


export const metaReducers: MetaReducer<State>[] =  [];
