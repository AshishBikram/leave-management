import { Routes } from '@angular/router';
import {authRoutes} from "./features/auth/auth.routes";
import {authenticatedRoutes} from "./features/authenticated/authenticated.routes";

export const routes: Routes = [
  ...authRoutes,
  ...authenticatedRoutes
];
