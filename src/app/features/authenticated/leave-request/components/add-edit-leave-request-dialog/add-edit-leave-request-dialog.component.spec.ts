import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {AddEditLeaveRequestDialogComponent} from "./add-edit-leave-request-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MockStore} from "@ngrx/store/testing";
import {State} from "@state/reducers/leave-request.reducers";
import {TokenService} from "@services/token/token.service";
import {NotificationService} from "@services/notification/notification.service";
import {ReactiveFormsModule} from "@angular/forms";
import {UserType} from "@model/user/user";
import {Store} from "@ngrx/store";
import {
  expandedLeaveRequests, mockCreateLeaveRequests,
  mockDialogData,
  mockLeaveRequests,
  mockUser
} from "../../../../../../mocks/leave-request.mocks";
import {of} from "rxjs";
import * as LeaveRequestActions from "@state/actions/leave-request.actions";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as LeaveBalanceActions from "@state/actions/leave-balance.actions";
import {LeaveStatusType} from "@model/leave-request/leave-request";


describe('AddEditLeaveRequestDialogComponent', () => {
  let component: AddEditLeaveRequestDialogComponent;
  let fixture: ComponentFixture<AddEditLeaveRequestDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AddEditLeaveRequestDialogComponent>>;
  let mockStore: jasmine.SpyObj<MockStore<State>>;
  let mockTokenService: jasmine.SpyObj<TokenService>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockStore = jasmine.createSpyObj('MockStore', ['dispatch', 'select']);
    mockTokenService = jasmine.createSpyObj('TokenService', ['getUserInfo']);
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['sendNotification']);
    mockTokenService.getUserInfo.and.returnValue(mockUser);
    mockStore.select.and.returnValue(of(expandedLeaveRequests));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Store, useValue: mockStore },
        {
          provide: TokenService, useValue: mockTokenService
        },
        { provide: MAT_DIALOG_DATA, useValue: { data:{mockDialogData} }},
        {
          provide: NotificationService,
          useValue: mockNotificationService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLeaveRequestDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userInfo on constructor', () => {
    expect(component.userInfo).toEqual(mockUser);
  });

  it('should initialize leaveRequestForm', () => {
    expect(component.leaveRequestForm).toBeDefined();
    expect(component.leaveRequestForm.get('leaveTypeId')).toBeDefined();
    expect(component.leaveRequestForm.get('fromDate')).toBeDefined();
    expect(component.leaveRequestForm.get('toDate')).toBeDefined();
    expect(component.leaveRequestForm.get('reason')).toBeDefined();
    expect(component.leaveRequestForm.get('status')).toBeDefined();
  });

  it('should dispatch load leave request action on ngOnInit', () => {
    mockTokenService.getUserInfo.and.returnValue(mockUser);
    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining(LeaveRequestActions.loadLeaveRequest({leaveRequest: {}})));
  });

  it('should dispatch load leave balance action on ngOnInit', () => {
    mockTokenService.getUserInfo.and.returnValue(mockUser);
    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining(LeaveBalanceActions.loadLeaveBalance({leaveBalance: {userId: component.data.userId}})));
  });

  it('should add validation on status on users other than employee on ngOnInit', () => {
    const mockUserNotEmployee = {...mockUser, role: UserType.Manager}
    mockTokenService.getUserInfo.and.returnValue(mockUserNotEmployee);
    expect(mockUserNotEmployee.role).not.toBe(UserType.Employee)
    fixture.detectChanges();
    expect(component.leaveRequestForm.get('status')?.validator).toBeDefined()
  });

  it('should submit leave request and close dialog', () => {
    component.data = {userId: 1, leaveRequest: undefined}
    expect(component.data.leaveRequest).not.toBeDefined()
    component.leaveRequestForm.setValue({
      leaveTypeId: '1',
      fromDate: new Date(),
      toDate: new Date(),
      reason: 'Test Reason',
      status: LeaveStatusType.Pending
    });
    component.submit();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should submit update leave request and close dialog', () => {
    component.data = mockDialogData
    expect(component.data.leaveRequest).toBeDefined()
    component.leaveRequestForm.setValue({
      leaveTypeId: '1',
      fromDate: new Date(),
      toDate: new Date(),
      reason: 'fasdf',
      status: LeaveStatusType.Pending
    });
    component.submit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining(LeaveRequestActions.updateLeaveRequest({leaveRequest: mockLeaveRequests})));
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should send notification if userId does not match userInfo id', () => {
    component.data = {...mockDialogData, userId: 2}
    expect(component.data.leaveRequest).toBeDefined()
    component.leaveRequestForm.setValue({
      leaveTypeId: '1',
      fromDate: new Date(),
      toDate: new Date(),
      reason: 'fasdf',
      status: LeaveStatusType.Pending
    });
    expect(component.data.userId).not.toEqual(mockUser.id)

    component.submit()

    expect(mockNotificationService.sendNotification).toHaveBeenCalledWith({userId: component.data.userId, status: component.leaveRequestForm.value.status ?? LeaveStatusType.Pending});
  });

  it('should close dialog on cancel', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

})
