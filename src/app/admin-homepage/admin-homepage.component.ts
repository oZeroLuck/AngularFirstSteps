import { Component, OnInit } from '@angular/core';
import {UsersClass} from '../usersClass';
import {TestTable} from '../tableTestConfig';
import {UsersService} from '../users.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  users$: Observable<UsersClass[]>;
  testTable = TestTable;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }
}
