import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './resources/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularFirstSteps';

  constructor(public http: HttpClient,
              public authService: AuthenticationService) {}

  public ping(): void {
    this.http.get('api/usersList')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  public isLoggedIn(): void {
    console.log(this.authService.isUserLoggedIn());
  }

  public deleteAll(): void {
    this.authService.logOut();
    console.log('Done');
  }
}
