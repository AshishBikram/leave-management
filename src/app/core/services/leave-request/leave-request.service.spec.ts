import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {LeaveRequestService} from "@services/leave-request/leave-request.service";
import {TestBed} from "@angular/core/testing";
import {expandedLeaveRequests, mockCreateLeaveRequests, mockLeaveRequests} from "../../../../mocks/leave-request.mocks";

describe('LeaveRequestService', () => {
  let service: LeaveRequestService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LeaveRequestService);
    httpController = TestBed.inject(HttpTestingController);
  });


  it('should call load all Leave Request', () => {

    // 1
    service.loadLeaveRequest({}).subscribe((res) => {
      //2
      expect(res).toBeTruthy()
      expect(res.length).toBe(1);
      const firstLeaveRequest = res.find(d => d.id == 1)
      expect(firstLeaveRequest?.userId).toBe(1);
    });

    //3
    const mockReq = httpController.expectOne(`leaveRequests?_expand=user&_expand=leaveType`);
    expect(mockReq.request.method).toBe('GET');

    //4
    mockReq.flush(Object.values(expandedLeaveRequests));
  });

  it('should call create Leave Request', () => {

    service.createLeaveRequest(mockCreateLeaveRequests).subscribe((res) => {

      expect(res).toBeTruthy()
      expect(res).toBe(mockLeaveRequests);
      expect(res.id).toBe(1);
    });


    const mockReq = httpController.expectOne(`leaveRequests`);
    expect(mockReq.request.method).toBe('POST');
    mockReq.flush(mockLeaveRequests);
  });

  it('should call delete Leave Request', () => {

    service.deleteLeaveRequest(mockLeaveRequests).subscribe((res) => {
      expect(res).toBeTruthy()
    });


    const mockReq = httpController.expectOne(`leaveRequests/1`);
    expect(mockReq.request.method).toBe('DELETE');
  });

  it('should call update Leave Request', () => {

    service.updateLeaveRequest(mockLeaveRequests).subscribe((res) => {
      expect(res).toBeTruthy()
      expect(res).toBe(mockLeaveRequests);
    });


    const mockReq = httpController.expectOne(`leaveRequests/1`);
    expect(mockReq.request.method).toBe('PUT');
    mockReq.flush(mockLeaveRequests);
  });

  it('should call get Leave Request by Id', () => {

    service.getLeaveRequest(1).subscribe((res) => {
      expect(res).toBeTruthy()
      expect(res.userId).toEqual(1)
    });


    const mockReq = httpController.expectOne(`leaveRequests/1?_expand=user&_expand=leaveType`);
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(expandedLeaveRequests[0]);
  });

  afterEach(() =>{
    httpController.verify()
  })
})
