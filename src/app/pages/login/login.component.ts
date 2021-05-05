import { Component, OnInit } from '@angular/core';
import { LoginBtn } from '../../resources/custom-configs/buttons/login-btn';
import { AuthenticationService} from '../../resources/services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginBtn = LoginBtn;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login(username: string, password: string): void {
    if (username.trim() && password.trim()) {
      this.authService.authenticate(username, password)
        .subscribe(userData => {
          if (userData) {
            console.log('hi!');
            this.navigate();
          }
        });
    }
  }

  navigate(): void {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      console.log('This is admin');
      this.router.navigate(['../homepage/customers'], {relativeTo: this.route});
    } else {
      console.log('This is customer');
      const userId = sessionStorage.getItem('id');
      this.router.navigate(['../homepage/customers/reservations/' + userId], {relativeTo: this.route});
    }
  }

}
