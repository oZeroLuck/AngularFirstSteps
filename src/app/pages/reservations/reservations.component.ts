import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../resources/services/model-services/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationClass } from '../../resources/models/reservation-class';
import { ReservationTable } from '../../resources/custom-configs/table-cfg/table-reservation-config';
import { UsersService } from '../../resources/services/model-services/users.service';
import { UserClass } from '../../resources/models/user-class';
import { ActionWrapper } from '../../resources/models/action-wrapper';
import { AdminResTable } from '../../resources/custom-configs/table-cfg/table-admin-res-config';
import { AuthenticationService } from '../../resources/services/authentication/authentication.service';
import {BackBtn} from '../../resources/custom-configs/buttons/back-btn';
import {Location} from '@angular/common';
import {ResApproveRequest} from '../../resources/models/res-approve-request';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  currentRole: boolean;
  adminResTable = AdminResTable;
  tableConfig = ReservationTable;
  reservations: ReservationClass[];
  backBtn = BackBtn;
  user: UserClass;
  error: boolean;
  errMsg: string;

  constructor(
    private resService: ReservationsService,
    private userService: UsersService,
    private authService: AuthenticationService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.error = false;
    this.isAdmin();
    this.getReservations();
  }

  getReservations(): void {
    const toInt = parseInt(this.route.snapshot.paramMap.get('userId'), 10);
    this.resService.getResByCustomer(toInt)
      .subscribe(rs => {
        this.reservations = rs;
        console.log(rs);
      });
    this.userService.getById(toInt)
      .subscribe(user => this.user = user);
  }

  dispatch($event: ActionWrapper): void {
    switch ($event.action) {
      case 'add':
        this.router.navigate(['./add'], {relativeTo: this.route});
        break;
      case 'edit':
        this.router.navigate(['./edit/' + $event.obj.id], {relativeTo: this.route});
        break;
      case 'accept':
        if (this.notPending($event.obj.status)) {
          const request = new ResApproveRequest($event.obj, 'Approved');
          this.resService.approve(request)
            .subscribe(res => {
              this.getReservations();
            },
              error => {
              this.errMsg = error.error;
              this.error = true;
              });
        } else {
          this.error = true;
          this.errMsg = `The reservations status isn't "pending"`;
        }
        break;
      case 'deny':
        if (this.notPending($event.obj.status)) {
          if (confirm('Are you sure?')) {
            const request = new ResApproveRequest($event.obj, 'Denied');
            this.resService.approve(request)
              .subscribe(next => {
                this.getReservations();
              },
                error => {
                  this.errMsg = error.error;
                  this.error = true;
                });
          }
        } else {
          this.error = true;
          this.errMsg = `The reservations status isn't "pending"`;
        }
        break;
      case 'delete':
        if (confirm('Are you sure?')) {
          this.resService.delete($event.obj)
            .subscribe(next => {
              this.getReservations();
            },
              error => {
              this.error = true;
              this.errMsg = error.error;
              });
        }
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }

  notPending(status: string): boolean {
    return !(status.toLowerCase() === 'approved' || status.toLowerCase() === 'denied');
  }

  isAdmin(): void {
    this.currentRole = sessionStorage.getItem('role') === 'ROLE_ADMIN';
  }

  back(): void {
    this.location.back();
  }

  resetError(event: boolean): void {
    this.error = event;
  }
}
