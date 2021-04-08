import {Injectable, Input} from '@angular/core';
import { MyButtonConfig } from './button-config';
import { BtnCONFIGS } from './btnconfigs';

@Injectable({
  providedIn: 'root'
})
export class ButtonServicesService {
  configs = BtnCONFIGS;

  constructor() { }

  getButton(sName: string): MyButtonConfig {
    return this.configs.find(btn => btn.name === sName);
  }
}
