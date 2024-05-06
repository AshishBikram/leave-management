import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "@services/user/user.service";
import {TokenService} from "@services/token/token.service";
import {routingLocation} from "@guard/no-auth.guard";

export const authGuard: CanActivateFn = (route) => {
  return checkUserLogin(route)
};

function checkUserLogin(route: ActivatedRouteSnapshot): boolean {
  const authService = inject(UserService)
  const tokenService = inject(TokenService);
  const router = inject(Router)
  if (authService.isLoggedIn()) {
    const userRole = tokenService.getUserInfo().role;
    if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      routingLocation(userRole, router)
      return false;
    }
    return true;
  }
  router.navigate(['/']);
  return false;
}
