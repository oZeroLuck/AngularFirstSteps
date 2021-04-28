import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../resources/services/users.service';
import { AuthenticationService } from '../../resources/services/authentication.service';
import { UserClass } from '../../resources/models/user-class';
import { LogoutBtn } from '../../resources/custom-configs/buttons/logout-btn';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EditBtn } from '../../resources/custom-configs/buttons/edit-btn';
import {CancelBtn} from '../../resources/custom-configs/buttons/cancel-btn';
import {SaveBtn} from '../../resources/custom-configs/buttons/save-btn';
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
  cancelBtn = CancelBtn;
  saveBtn = SaveBtn;

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.editMode = false;
  }

  btnClick(action: string): void {
    switch (action) {
      case 'edit':
        this.editMode = true;
        break;
      case 'logout':
        this.logout();
        break;
      case 'cancel':
        this.editMode = false;
        break;
      default:
        console.log('Wtf just happened?');
    }
  }

  getCurrentUser(): void {
    const currentUserId = this.authService.getCurrentUser();
    this.currentUser$ = this.userService.getById(currentUserId);
  }

  save(user: UserClass): void {
    this.userService.update(user).subscribe();
    this.editMode = false;
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
