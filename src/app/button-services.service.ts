import { Injectable } from '@angular/core';
import { MyButtonConfig } from './button-config';
import { BtnCONFIGS } from './btnconfigs';

@Injectable({
  providedIn: 'root'
})
export class ButtonServicesService {

  constructor() { }

  getButtons(): MyButtonConfig[] {
    return BtnCONFIGS;
  }

}
