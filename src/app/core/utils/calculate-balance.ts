import {LeaveRequestResponse, LeaveStatusType} from "@model/leave-request/leave-request";
import {LeaveAllocationResponse} from "@model/leave-allocation/leave-allocation";
import {LeaveBalance} from "@model/leave-balance/leave-balance";
import dayjs from "dayjs";

export function calculateBalance(leaveRequests: LeaveRequestResponse[], leaveAllocations: LeaveAllocationResponse[]): LeaveBalance[] {
  const totalLeavesTaken = totalLeaveRequests(leaveRequests);
  const d = leaveAllocations.map(d => {
    return {
      ...d,
      days: d.days - (totalLeavesTaken[d.leaveTypeId] ?? 0),
      leaveTaken: totalLeavesTaken[d.leaveTypeId] ?? 0
    }
  })
  console.log(d,totalLeavesTaken)
  return d;
}

function totalLeaveRequests(leaveRequests: LeaveRequestResponse[]):Record<string, number>{
  const value: Record<string, number> = {};
  return leaveRequests?.filter(d => d.status !== LeaveStatusType.Rejected.toString())?.reduce((d,c) => {
    const days = dayjs(c.toDate).diff(dayjs(c.fromDate), "days") + 1;
    console.log(Object.keys(d), c.leaveTypeId.toString())
    if(!Object.keys(d).includes(c.leaveTypeId.toString())){
      d[c.leaveTypeId] = days
    }else {
      d[c.leaveTypeId]= c.leaveTypeId + days
    }
    return d;
  }, value)
}
