import {UserSignUpResponse} from "@model/user/user";
import {LeaveType} from "@model/leave-type/leave-type";

export interface LeaveAllocation {
  id: number,
  leaveTypeId: number,
  days: number,
  userId: number
}

export interface LeaveAllocationResponse extends LeaveAllocation {
  user: UserSignUpResponse,
  leaveType: LeaveType,
}
