import { Component, Input, OnInit } from '@angular/core';
import { UserClass } from '../../resources/models/user-class';
import { LogoutBtn } from '../../resources/custom-configs/buttons/logout-btn';
import { EditBtn } from '../../resources/custom-configs/buttons/edit-btn';
import {AuthenticationService} from '../../resources/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() userData: UserClass;

  logoutBtn = LogoutBtn;
  editBtn = EditBtn;
  toDisplay: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.userData);
    this.toDisplay = this.userData;
    console.log(this.toDisplay);
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
