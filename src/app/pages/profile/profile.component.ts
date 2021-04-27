import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../resources/services/users.service';
import {AuthenticationService} from '../../resources/services/authentication.service';
import { UserClass } from '../../resources/models/user-class';
import { LogoutBtn } from '../../resources/custom-configs/buttons/logout-btn';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { EditBtn } from '../../resources/custom-configs/buttons/edit-btn';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode: boolean;

  currentUser$: Observable<UserClass>;
  currentUser: UserClass;

  logoutBtn = LogoutBtn;
  editBtn = EditBtn;

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.editMode = true;
    console.log(this.currentUser$);
  }

  getCurrentUser(): void {
    const currentUserName = this.authService.getCurrentUser();
    console.log(currentUserName);
    this.currentUser$ = this.userService.getByUsername(currentUserName);
    this.userService.getByUsername(currentUserName).subscribe(o => console.log(o));
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
