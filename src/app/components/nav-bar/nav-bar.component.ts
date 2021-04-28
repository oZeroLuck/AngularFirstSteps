import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentRole(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

  getCustomerId(): string {
    return sessionStorage.getItem('id');
  }
}
