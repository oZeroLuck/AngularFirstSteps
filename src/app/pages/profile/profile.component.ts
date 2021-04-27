import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../resources/services/users.service';
import { AuthenticationService } from '../../resources/services/authentication.service';
import { UserClass } from '../../resources/models/user-class';
import { LogoutBtn } from '../../resources/custom-configs/buttons/logout-btn';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser$: Observable<UserClass>;
  currentUser: UserClass = {
    id: null,
    name: '',
    lastName: '',
    isAdmin: false,
    dateOfBirth: '',
    username: '',
    password: ''
  };
  logoutBtn = LogoutBtn;

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.userService.getByUsername(this.authService.getCurrentUser()));
    this.getCurrentUser();
    this.currentUser$.subscribe(u => this.currentUser = u);
    console.log(this.currentUser);
  }

  getCurrentUser(): void {
    const currentUserName = this.authService.getCurrentUser();
    this.currentUser$ = this.userService.getByUsername(currentUserName);
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
