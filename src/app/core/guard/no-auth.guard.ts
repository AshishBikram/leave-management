import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "@services/user/user.service";
import {TokenService} from "@services/token/token.service";
import {UserType} from "@model/user/user";

export const noAuthGuard: CanActivateFn = (route, state) => {
  return checkIfNotLogin(route)
};

function checkIfNotLogin(route: ActivatedRouteSnapshot) {
  const authService = inject(UserService)
  const tokenService = inject(TokenService);
  const router = inject(Router)
  if (authService.isLoggedIn()) {
    const userRole = tokenService.getUserInfo().role;
    routingLocation(userRole, router)
    return false;
  }
  return true;
}
export function routingLocation(role: string, router: Router){
  switch (role){
    case UserType.Employee:
      router.navigateByUrl('/leave-balance');
      break
    case UserType.HR:
      router.navigate(['/home']);
      break
    case UserType.Manager:
      router.navigateByUrl("/leave-request");
      break
    default:
      router.navigateByUrl('/home');
  }
}
