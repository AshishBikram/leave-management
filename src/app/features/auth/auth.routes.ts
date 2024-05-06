import {Routes} from "@angular/router";
import {authGuard} from "@guard/auth.guard";
import {noAuthGuard} from "@guard/no-auth.guard";

export const authRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: "login",
    loadComponent: () => import("./login/login.component").then(mod => mod.LoginComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: "sign-up",
    loadComponent: () => import("./sign-up/sign-up.component").then(mod => mod.SignUpComponent),
    canActivate: [noAuthGuard],
  }
];
