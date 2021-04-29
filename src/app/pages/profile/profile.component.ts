import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../resources/services/users.service';
import { AuthenticationService } from '../../resources/services/authentication.service';
import { UserClass } from '../../resources/models/user-class';
import { LogoutBtn } from '../../resources/custom-configs/buttons/logout-btn';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EditBtn } from '../../resources/custom-configs/buttons/edit-btn';
import { CancelBtn } from '../../resources/custom-configs/buttons/cancel-btn';
import { SaveBtn } from '../../resources/custom-configs/buttons/save-btn';
import { EditPswBtn } from '../../resources/custom-configs/buttons/edit-psw-btn';

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
  changePswd = EditPswBtn;

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
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
      case 'changePswd':
        console.log('Changing pswd');
        break;
      default:
        console.log('Wtf just happened?');
    }
  }

  getCurrentUser(): void {
    let currentUserId: number;
    if (sessionStorage.getItem('role') === 'ADMIN') {
      currentUserId = this.authService.getCurrentUser();
    } else {
      currentUserId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }
    this.currentUser$ = this.userService.getById(currentUserId);
  }

  save(user: UserClass): void {
    this.userService.update(user).subscribe();
    this.editMode = false;
  }

  checkPswd(user: UserClass, $event: any): void {
    if (user.password === $event.current && $event.new === $event.confirm) {
      console.log($event.new);
      user.password = $event.new;
      this.userService.update(user).subscribe();
    } else {
      console.log('PswdError');
    }
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
