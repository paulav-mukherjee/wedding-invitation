import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(): boolean {
    let user_token = localStorage.getItem('token')
    let hogan_authentication = JSON.parse(localStorage.getItem('hogan_authentication'))
    if (user_token && hogan_authentication == true) {
      return true
    } else {
      this.router.navigateByUrl('login')
      return false;
    }
  }
  
}
