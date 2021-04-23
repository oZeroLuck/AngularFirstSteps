import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../resources/services/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationClass } from '../../resources/models/reservation-class';
import { Observable } from 'rxjs';
import { ReservationTable } from '../../resources/custom-configs/table-cfg/table-reservation-config';
import { UsersService } from '../../resources/services/users.service';
import { UserClass } from '../../resources/models/user-class';
import { ActionWrapper } from '../../resources/models/action-wrapper';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  tableConfig = ReservationTable;
  reservations$: Observable<ReservationClass[]>;
  user: UserClass;

  constructor(
    private resService: ReservationsService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    console.log(parseInt(this.route.snapshot.paramMap.get('userId'), 10));
    const toInt = parseInt(this.route.snapshot.paramMap.get('userId'), 10);
    this.reservations$ = this.resService.getResByCustomer(toInt);
    this.userService.getById(toInt)
      .subscribe(user => this.user = user);
  }

  dispatch($event: ActionWrapper): void {
    switch ($event.action) {
      case 'add':
        this.router.navigate(['./add/1'], {relativeTo: this.route});
        break;
      case 'delete':
        if (confirm('Are you sure?')) {
          this.resService.delete($event.obj)
            .subscribe();
          this.getReservations();
        }
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }

}
