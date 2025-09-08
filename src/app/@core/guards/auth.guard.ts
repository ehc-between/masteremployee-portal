import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated.pipe(
      take(1),
      map((isAuth) => {
        const returnUrl = state.url;
        if (!isAuth) {
          if (returnUrl) {
            this.router.navigate(['auth/login'], { queryParams: { returnUrl } });
            return false;
          }
          this.router.navigate(['auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
