import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _router: Router,private authService : AuthService) {}
  stay: boolean = false;
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   const currentUser = localStorage.getItem("loginToken");
  //   const user = sessionStorage.getItem("loginToken");
  //   if (currentUser || user) {
  //     return true;
  //   } else {
  //     this._router.navigate(["/home"]);
  //     return false;
  //   }
  // }


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }
  
}
