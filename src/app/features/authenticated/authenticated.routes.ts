import {Routes} from "@angular/router";
import {UserType} from "@model/user/user";
import {ContentLayoutComponent} from "@shared/layout/content-layout/content-layout.component";
import {authGuard} from "@guard/auth.guard";

export const authenticatedRoutes: Routes = [
  {
    path: "",
    component: ContentLayoutComponent,
    children: [
      {
        path: "home",
        canActivate: [authGuard],
        data: {
          role: [UserType.HR]
        },
        loadComponent: () => import("./dashboard/dashboard.component").then(mod => mod.DashboardComponent)
      },
      {
        path: "leave-balance",
        canActivate: [authGuard],
        data: {
          role: [UserType.Employee]
        },
        loadComponent: () => import("./leave-balance/leave-balance.component").then(mod => mod.LeaveBalanceComponent)
      },
      {
        path: "leave-request",
        canActivate: [authGuard],
        data: {
          role: [UserType.Employee, UserType.HR, UserType.Manager]
        },
        loadComponent: () => import("./leave-request/leave-request.component").then(mod => mod.LeaveRequestComponent)
      },
      {
        path: "leave-types",
        canActivate: [authGuard],
        data: {
          role: [UserType.HR, UserType.Manager]
        },
        loadComponent: () => import("./leave-types/leave-types.component").then(mod => mod.LeaveTypesComponent)
      },
      {
        path: "employee",
        children: [
          {
            path: "",
            canActivate: [authGuard],
            data: {
              role: [UserType.HR, UserType.Manager]
            },
            loadComponent: () => import("./employee/employee.component").then(mod => mod.EmployeeComponent),
          },
          {
            path: ":employeeId/leave-allocation",
            canActivate: [authGuard],
            data: {
              role: [UserType.HR, UserType.Manager]
            },
            loadComponent: () => import("./employee/leave-allocation/leave-allocation.component").then(mod => mod.LeaveAllocationComponent),
          }
        ]
      },
    ]
  },
];
