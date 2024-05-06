import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {LeaveRequest, LeaveRequestResponse} from "@model/leave-request/leave-request";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  url = "leaveRequests"
  constructor(private http: HttpClient) { }

  loadLeaveRequest(params: Partial<LeaveRequest>): Observable<LeaveRequestResponse[]> {
    return this.http.get<LeaveRequestResponse[]>(`${this.url}?_expand=user&_expand=leaveType`, {params})
  }

  createLeaveRequest(data: Omit<LeaveRequest, "id"> ): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.url}`, data)
  }

  deleteLeaveRequest(data: LeaveRequest): Observable<LeaveRequestResponse> {
    return this.http.delete<LeaveRequestResponse>(`${this.url}/${data.id}`)
  }

  updateLeaveRequest(data: LeaveRequest): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.url}/${data.id}`, data)
  }

  getLeaveRequest(id: number): Observable<LeaveRequestResponse> {
    return this.http.get<LeaveRequestResponse>(`${this.url}/${id}?_expand=user&_expand=leaveType`)
  }
}
