import { Component, OnInit } from '@angular/core';
import { LogoutBtn } from '../../resources/custom-configs/buttons/logout-btn';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../resources/services/authentication/authentication.service';
import {TokenStorageService} from '../../resources/services/authentication/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  logoutBtn = LogoutBtn;

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  currentRole(): boolean {
    return sessionStorage.getItem('role') === 'ROLE_ADMIN';
  }

  getCustomerId(): string {
    return sessionStorage.getItem('id');
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.auth.logOut();
      this.router.navigate(['login']);
    }
  }
}
