import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyButtonConfig} from '../button-config';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() btnType: MyButtonConfig;

  @Output() emitter = new EventEmitter<any>();

  constructor() { }

  btnClicked(action: string): void {
    this.emitter.emit(action);
  }

  ngOnInit(): void { }

  }
