import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {LeaveRequestComponent} from './leave-request.component';
import {Store} from '@ngrx/store';
import {TokenService} from '@services/token/token.service';
import {of} from 'rxjs';
import {UserSignUpResponse, UserType} from '@model/user/user';
import {LeaveRequestResponse} from '@model/leave-request/leave-request';
import {By} from '@angular/platform-browser';
import {expandedLeaveRequests, mockUser} from "../../../../mocks/leave-request.mocks";
import {
  AddEditLeaveRequestDialogComponent
} from "./components/add-edit-leave-request-dialog/add-edit-leave-request-dialog.component";
import * as LeaveRequestActions from "@state/actions/leave-request.actions";
import {MockStore} from "@ngrx/store/testing";
import {State} from "@state/reducers/leave-request.reducers";
import * as LeaveRequestSelector from "@state/selectors/leave-request.selectors";

describe('LeaveRequestComponent', () => {
  let component: LeaveRequestComponent;
  let fixture: ComponentFixture<LeaveRequestComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockStore: jasmine.SpyObj<MockStore<State>>;
  let mockTokenService: jasmine.SpyObj<TokenService>;

  beforeEach(waitForAsync(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockStore = jasmine.createSpyObj('MockStore', ['dispatch', 'select']);
    mockTokenService = jasmine.createSpyObj('TokenService', ['getUserInfo']);
    mockTokenService.getUserInfo.and.returnValue(mockUser);
    mockStore.select.and.returnValue(of(expandedLeaveRequests));

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: Store, useValue: mockStore },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userInfo on constructor', () => {
    expect(component.userInfo).toEqual(mockUser);
  });

  it('should dispatch load leave request action on ngOnInit for given all user', () => {
    const mockNotEmployeeUser: UserSignUpResponse = {...mockUser, role: UserType.Manager}
    mockTokenService.getUserInfo.and.returnValue(mockNotEmployeeUser);
    expect(mockNotEmployeeUser.role).not.toBe(UserType.Employee)
    fixture.detectChanges();

    //expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining(LeaveRequestActions.loadLeaveRequest({leaveRequest: {} })));
    expect(mockStore.select).toHaveBeenCalledWith(LeaveRequestSelector.getLeaveRequest)
  });

  it('should dispatch load leave request action on ngOnInit for given user Id', () => {
    mockTokenService.getUserInfo.and.returnValue(mockUser);
    expect(mockUser.role).toBe(UserType.Employee)
    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining(LeaveRequestActions.loadLeaveRequest({leaveRequest: {userId: mockUser.id}})));
    expect(mockStore.select).toHaveBeenCalledWith(LeaveRequestSelector.getLeaveRequest)
  });




  it('should open dialog when openDialog() is called', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) });
    const dialogSpy = mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(dialogSpy).toHaveBeenCalledWith(AddEditLeaveRequestDialogComponent, jasmine.objectContaining({
      width: '400px',
      height: '400px',
      data: { userId: 1 }
    }));
  });

  it('should dispatch delete action when delete() is called', () => {
    const leaveRequest: LeaveRequestResponse = expandedLeaveRequests[0];
    component.delete(leaveRequest);

    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining(LeaveRequestActions.deleteLeaveRequest({
      leaveRequest: leaveRequest
    })));
  });

  it('should open update dialog when openUpdateDialog() is called', () => {
    const leaveRequestResponse: LeaveRequestResponse = expandedLeaveRequests[0];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) });
    const dialogSpy = mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openUpdateDialog(leaveRequestResponse);

    expect(dialogSpy).toHaveBeenCalledWith(AddEditLeaveRequestDialogComponent, jasmine.objectContaining({
      width: '400px',
      height: '400px',
      data: {
        userId: 1,
        leaveRequest: leaveRequestResponse
      }
    }));
  });

  // Additional test cases can be added as needed
});
