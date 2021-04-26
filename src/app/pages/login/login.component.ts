import { Component, OnInit } from '@angular/core';
import { LoginBtn } from '../../resources/custom-configs/buttons/login-btn';
import { AuthenticationService } from '../../resources/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginBtn = LoginBtn;

  constructor(private authService = AuthenticationService) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    console.log(username + ' | ' + password);
    this.authService.authenticate(username, password);
  }
}
