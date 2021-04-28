import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService} from './resources/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.auth.isUserLoggedIn() && sessionStorage.getItem('role') !== 'ADMIN') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}