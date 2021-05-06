import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../resources/services/authentication/token-storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  currentUser: any;

  constructor(
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getToken();
  }

}
