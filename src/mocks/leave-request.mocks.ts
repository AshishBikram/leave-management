import {LeaveRequest, LeaveRequestResponse, LeaveStatusType} from "@model/leave-request/leave-request";
import {DepartmentType, UserSignUpResponse, UserType} from "@model/user/user";
import {
  MatDialogAddEditType
} from "../app/features/authenticated/leave-request/components/add-edit-leave-request-dialog/add-edit-leave-request-dialog.component";

export const mockUser: UserSignUpResponse = {
  email: "hari@gmail.com",
  name: "hari",
  department: DepartmentType.IT,
  phoneNumber: "014485424",
  role: UserType.Employee,
  id: 1
}


export const mockLeaveType = {
  name: "Causal",
  id: 1
}
export const mockCreateLeaveRequests:Omit<LeaveRequest, "id"> = {
  userId: 1,
  leaveTypeId: 1,
  fromDate: "2024-04-30",
  toDate: "2024-04-30",
  reason: "fasdf",
  status: LeaveStatusType.Pending
}
export const mockLeaveRequests: LeaveRequest = {
    id: 1,
    userId: 1,
    leaveTypeId: 1,
    fromDate: "2024-05-06",
    toDate: "2024-05-06",
    reason: "fasdf",
    status: LeaveStatusType.Pending
}

export const expandedLeaveRequests:LeaveRequestResponse[] = [{
  id: 1,
  userId: 1,
  leaveTypeId: 1,
  fromDate: "2024-04-30",
  toDate: "2024-04-30",
  reason: "fasdf",
  status: LeaveStatusType.Approved,
  user: {
    email: "hari@gmail.com",
    name: "hari",
    department: DepartmentType.HR,
    phoneNumber: "014485424",
    role: UserType.HR,
    id: 1
  },
  leaveType: {
    name: "Causal",
    id: 1
  }
}]

export const mockDialogData: MatDialogAddEditType = {
  userId: 1,
  leaveRequest: expandedLeaveRequests[0]
}
