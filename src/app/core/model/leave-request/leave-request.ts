import {UserSignUpResponse} from "@model/user/user";
import {LeaveType} from "@model/leave-type/leave-type";

export enum LeaveStatusType {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected"

}
export interface LeaveRequest{
  id: number;
  leaveTypeId: number;
  userId: number;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatusType;
}

export interface LeaveRequestResponse extends LeaveRequest{
  user: UserSignUpResponse,
  leaveType: LeaveType,
}
