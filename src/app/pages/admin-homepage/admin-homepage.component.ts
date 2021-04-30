import { Component, OnInit } from '@angular/core';
import { UserClass } from '../../resources/models/user-class';
import { UserTable } from '../../resources/custom-configs/table-cfg/table-user-config';
import { UsersService } from '../../resources/services/model-services/users.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionWrapper } from '../../resources/models/action-wrapper';
import { HttpClient } from '@angular/common/http';
import { ReservationsService } from '../../resources/services/model-services/reservations.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  users$: Observable<UserClass[]>;
  testTable = UserTable;

  error: boolean;
  errMsg: string;

  constructor(
    private usersService: UsersService,
    private resService: ReservationsService,
    private router: Router,
    private route: ActivatedRoute,
    public http: HttpClient) { }

  ngOnInit(): void {
    this.error = false;
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }

  dispatch($event: ActionWrapper): void {
    console.log($event.action);
    switch ($event.action) {
      case 'add':
        this.router.navigate(['./customer/add'], {relativeTo: this.route});
        break;
      case 'edit':
        this.router.navigate(['./customer/edit/' + $event.obj.id], {relativeTo: this.route});
        break;
      case 'delete':
        if (confirm('Are you sure?')) {
          this.delete($event.obj);
        } else {return; }
        break;
      case 'reservations':
        this.router.navigate(['./reservations/' + $event.obj.id], {relativeTo: this.route});
        break;
      default :
        this.error = true;
        this.errMsg = 'Operation not supported';
        break;
    }
  }

  delete(user: UserClass): void {
    const reservations = this.resService.getResByCustomer(user.id).pipe(
      map((rs) => _.filter(rs, ['pending', 'approved']))
    );
    if (reservations === undefined) {
      this.usersService.delete(user)
        .subscribe();
    } else {
      this.error = true;
      this.errMsg = 'Cannot delete this user because he/she has reservations';
    }
    this.getUsers();
  }

  resetError(event: boolean): void {
    this.error = event;
  }

}
