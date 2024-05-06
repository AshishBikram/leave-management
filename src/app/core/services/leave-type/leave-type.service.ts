import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {LeaveType} from "@model/leave-type/leave-type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  url = "leaveTypes"
  constructor(private http: HttpClient) { }

  loadLeaveType(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(this.url)
  }

  createLeaveType(data: Partial<LeaveType>): Observable<LeaveType> {
    return this.http.post<LeaveType>(this.url, {...data})
  }

  deleteLeaveType(data: LeaveType): Observable<LeaveType> {
    return this.http.delete<LeaveType>(`${this.url}/${data.id}`)
  }

  updateLeaveType(data: LeaveType): Observable<LeaveType> {
    return this.http.put<LeaveType>(`${this.url}/${data.id}`, data)
  }
}
