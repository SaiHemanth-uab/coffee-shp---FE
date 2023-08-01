import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MenuService } from '../services/menu.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: MenuService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = sessionStorage.getItem('accessToken');
    if (user) {
      // logged in so return true
      return true;
    } else {
      console.log(user);
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
  }
}
