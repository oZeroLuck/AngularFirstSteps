import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {
  @Input() message: string;
  @Input() type: string;

  @Output() emitter = new EventEmitter<any>();

  constructor() { }

  emit(): void {
    this.emitter.emit(false);
  }
}
