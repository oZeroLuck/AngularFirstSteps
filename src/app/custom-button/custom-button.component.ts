import {Component, Input, OnInit} from '@angular/core';
import { MyButtonConfig } from '../button-config';
import { BtnCONFIGS } from '../btnconfigs';

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
  configs = BtnCONFIGS;
  @Input() configName: string;

  constructor() { }

  get buttonType(): MyButtonConfig {
        return this.configs.find(btn => btn.name === this.configName);
  }

  ngOnInit(): void {
  }

}
