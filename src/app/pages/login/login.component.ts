import { Component, OnInit } from '@angular/core';
import { LoginBtn } from '../../resources/custom-configs/buttons/login-btn';
import { AuthenticationService} from '../../resources/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from '../../resources/services/model-services/users.service';
import { map } from 'rxjs/operators';

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
  ) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login(username: string, password: string): void {
    if (username.trim() && password.trim()) {
      this.authService.authenticate(username, password).subscribe();
    }
    if (this.authService.authenticate(username, password)) {
      if (sessionStorage.getItem('role') === 'ADMIN') {
        this.router.navigateByUrl('/homepage/customers');
      } else {
        const userId = sessionStorage.getItem('id');
        this.router.navigateByUrl('/homepage/customers/reservations/' + userId);
      }
    }
  }

}
