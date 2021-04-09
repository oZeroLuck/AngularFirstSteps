import {Component, Input, OnInit} from '@angular/core';
import {MyButtonConfig} from '../button-config';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() btnType: MyButtonConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
