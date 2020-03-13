import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, mergeMap, take } from 'rxjs/internal/operators';

import * as AuthSelectors from '@root-store/auth/selectors/auth.selectors';

import { AppState } from '@root-store/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkStoreAuthentication().pipe(
      mergeMap((storeAuth) => {
        if (storeAuth) {
          return of(true);
        }

        return localStorage.getItem('sessionToken') ? of(true) : of(false);
      }),
      map(storeOrApiAuth => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/sign-in']);
          return false;
        }

        return true;
      })
    );

    return true;
  }

  checkStoreAuthentication() {
    return this.store.select(AuthSelectors.getIsAuthenticated).pipe(take(1));
  }

}
