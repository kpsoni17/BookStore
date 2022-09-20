import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _router: Router) {}
  stay: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = localStorage.getItem("loginToken");
    const user = sessionStorage.getItem("loginToken");
    if (currentUser || user) {
      return true;
    } else {
      this._router.navigate(["/home"]);
      return false;
    }
  }
  
}
