import { Component, OnInit } from '@angular/core';
import { LoginBtn } from '../../resources/custom-configs/buttons/login-btn';
import { AuthenticationService} from '../../resources/services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from '../../resources/services/users.service';
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
    private userService: UsersService
  ) { }

  ngOnInit(): void { }

  login(username: string, password: string): void {
    if (username.trim() && password.trim()) {
      this.authService.authenticate(username, password).subscribe();
    }
    if (this.authService.authenticate(username, password)) {
      if (sessionStorage.getItem('role') === 'ADMIN') {
        this.router.navigateByUrl('/homepage/customers');
      } else {
        this.userService.getByUsername(this.authService.getCurrentUser()).pipe(
          map(user => {
            sessionStorage.setItem('userId', user.id.toString());
            this.router.navigateByUrl('/homepage/customers/reservations/' + user.id);
          })
        );
      }
    }
  }

}
