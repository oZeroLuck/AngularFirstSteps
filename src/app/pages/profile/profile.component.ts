import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../resources/services/model-services/users.service';
import { AuthenticationService } from '../../resources/services/authentication/authentication.service';
import { UserClass } from '../../resources/models/user-class';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveBtn } from '../../resources/custom-configs/buttons/save-btn';
import { EditPswBtn } from '../../resources/custom-configs/buttons/edit-psw-btn';
import {TokenStorageService} from '../../resources/services/authentication/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode: boolean;
  currentUser: UserClass;
  saveBtn = SaveBtn;
  changePswd = EditPswBtn;

  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private tokenService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.editMode = false;
  }

  getCurrentUser(): void {
    let currentUserId: number;
    if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
      currentUserId = this.tokenService.getUser().id;
    } else {
      currentUserId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }
    this.userService.getById(currentUserId).subscribe(u => this.currentUser = u);
  }

  save(user: UserClass): void {
    this.userService.update(user).subscribe();
    this.editMode = false;
  }

  checkPswd(user: UserClass, $event: any): void {
    if (user.password === $event.current && $event.new === $event.confirm) {
      user.password = $event.new;
      this.userService.update(user).subscribe();
    } else {
      console.log('PswdError');
    }
  }

  dispatch(event: any): void {
    if (typeof event === 'string') {
      this.editMode = event !== 'cancel';
      this.getCurrentUser();
    } else {
      this.userService.update(event).subscribe();
      this.editMode = false;
    }
  }
}
