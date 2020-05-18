import { TokenService } from './Token.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.tokenService.isUserLoggedIn() || !this.tokenService.isAuthorized(route.data.roleCode) ) {
      if (!this.tokenService.isUserLoggedIn()){
        this.router.navigate(['/login']);
      }
      return false;
    } else {
      return true;
    }
  }
}

