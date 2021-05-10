import {Component, OnChanges, OnInit} from '@angular/core';
import { UserClass } from '../../resources/models/user-class';
import { UserTable } from '../../resources/custom-configs/table-cfg/table-user-config';
import { UsersService } from '../../resources/services/model-services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionWrapper } from '../../resources/models/action-wrapper';
import { HttpClient } from '@angular/common/http';
import { ReservationsService } from '../../resources/services/model-services/reservations.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit, OnChanges {

  users: UserClass[];
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

  ngOnChanges(): void {
    this.ngOnInit();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(
      us => this.users = us,
      error => {
          this.error = true;
          this.errMsg = error.error;
        }
      );
  }

  dispatch($event: ActionWrapper): void {
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
    this.resService.getResByCustomer(user.id).subscribe( rs => {
        console.log(rs);
        const reservations = _.filter(rs, ['pending', 'approved']);
        this.check(reservations, user);
      });
  }

  resetError(event: boolean): void {
    this.error = event;
  }

  check(reservations: any, user: UserClass): void {
    console.log(reservations);
    if (reservations.length < 1) {
      this.usersService.delete(user)
        .subscribe(o => { this.getUsers(); });
      this.error = false;
    } else {
      this.error = true;
      this.errMsg = 'Cannot delete this user because he/she has reservations';
    }
    this.getUsers();
  }

}
