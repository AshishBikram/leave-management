import {LeaveAllocationResponse} from "@model/leave-allocation/leave-allocation";

export interface LeaveBalance extends LeaveAllocationResponse{
  leaveTaken: number
}
