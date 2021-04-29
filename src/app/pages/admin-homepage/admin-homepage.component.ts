import { Component, OnInit } from '@angular/core';
import { UserClass } from '../../resources/models/user-class';
import { UserTable } from '../../resources/custom-configs/table-cfg/table-user-config';
import { UsersService } from '../../resources/services/model-services/users.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionWrapper } from '../../resources/models/action-wrapper';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  users$: Observable<UserClass[]>;
  testTable = UserTable;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    public http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }

  dispatch($event: ActionWrapper): void {
    console.log($event.action);
    switch ($event.action) {
      case 'add':
        console.log('Im here');
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
        console.log('WRONG OP CODE');
        break;
    }
  }

  delete(user: UserClass): void {
    this.usersService.delete(user)
      .subscribe();
    this.getUsers();
  }

}
