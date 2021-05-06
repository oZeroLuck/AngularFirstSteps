import { Component, OnInit } from '@angular/core';
import { LoginBtn } from '../../resources/custom-configs/buttons/login-btn';
import { AuthenticationService} from '../../resources/services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../resources/services/authentication/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginBtn = LoginBtn;
  loginFailed = false;
  errorMsg = '';

  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login(username: string, password: string): void {
    this.authService.authenticate(username, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.loginFailed = false;
        this.redirect();
      },
      err => {
        this.errorMsg = err.error.message;
        this.loginFailed = true;
      }
    );
  }

  redirect(): void {
    window.sessionStorage.setItem('role', this.tokenStorage.getUser().role);
    if (this.tokenStorage.getUser().role === 'ROLE_ADMIN') {
      console.log('Admin here');
      this.router.navigate(['../homepage/customers'], {relativeTo: this.route});
    } else {
      console.log('Customer here');
      this.router.navigate(['../homepage/customers/profile/3'], {relativeTo: this.route});
    }
  }

}
