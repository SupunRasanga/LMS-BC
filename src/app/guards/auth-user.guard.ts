import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate{
  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      const emailStorage  =localStorage.getItem('userEmail');

    if (emailStorage != '') {

      return true;
    } else {
      this.router.navigate(['/login']);

      alert("Disabled");
      return false;
    }
      //return false;
  }

}
