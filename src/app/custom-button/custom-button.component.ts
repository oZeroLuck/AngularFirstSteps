import {Component, Input, OnInit} from '@angular/core';

enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Warning = 'Warning'
}

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() text: string;
  @Input() btnType: string;

  constructor() { }

  get buttonType(): string {
    switch (this.btnType) {
      case ButtonType.Primary:
        return 'primary-btn';
      case ButtonType.Secondary:
        return 'secondary-btn';
      case ButtonType.Warning:
        return 'warning-btn';
    }
  }

  ngOnInit(): void {
  }

}
