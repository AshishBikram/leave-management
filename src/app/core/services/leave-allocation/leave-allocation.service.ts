import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {LeaveAllocation, LeaveAllocationResponse} from "@model/leave-allocation/leave-allocation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LeaveAllocationService {
  url = "leaveAllocations"
  constructor(private http: HttpClient) { }

  loadLeaveAllocation(params: Partial<LeaveAllocation>): Observable<LeaveAllocationResponse[]> {
    return this.http.get<LeaveAllocationResponse[]>(`${this.url}?_expand=user&_expand=leaveType`, {params})
  }

  createLeaveAllocation(data: Omit<LeaveAllocation, "id"> ): Observable<LeaveAllocation> {
    return this.http.post<LeaveAllocation>(`${this.url}`, data)
  }

  deleteLeaveAllocation(data: LeaveAllocation): Observable<LeaveAllocationResponse> {
    return this.http.delete<LeaveAllocationResponse>(`${this.url}/${data.id}`)
  }

  updateLeaveAllocation(data: LeaveAllocation): Observable<LeaveAllocation> {
    return this.http.put<LeaveAllocation>(`${this.url}/${data.id}`, data)
  }

  getLeaveAllocation(id: number): Observable<LeaveAllocationResponse> {
    return this.http.get<LeaveAllocationResponse>(`${this.url}/${id}?_expand=user&_expand=leaveType`)
  }
}
