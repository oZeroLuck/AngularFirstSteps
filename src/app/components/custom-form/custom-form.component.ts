import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../resources/services/model-services/users.service';
import {VehicleService} from '../../resources/services/model-services/vehicle.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {
  @Input() obj: any;
  @Input() objClass: string;
  @Input() actionType: string;

  rows = [];
  objKeys: any;
  classService: any;

  constructor(
    private userService: UsersService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.getService();
    this.getKeys();
  }

  getService(): void {
    if (this.objClass === 'customer') {
      this.classService = this.userService;
    } else {
      this.classService = this.vehicleService;
    }
  }

  getKeys(): void {
    this.objKeys = Object.keys(this.obj);
    // tslint:disable-next-line:only-arrow-functions
    _.remove(this.objKeys, function(o): any {
      return o === 'id' || o === 'password' || o === 'isAdmin';
    });
    console.log(this.objKeys);
    const length = this.objKeys.length;
    for (let i = 0; i < length; i += 2) {
      const temp: string[] = [];
      temp.push(this.objKeys[i]);
      temp.push(this.objKeys[i + 1]);
      this.rows.push(temp);
    }
    console.log(this.rows[this.rows.length - 1]);
    // tslint:disable-next-line:only-arrow-functions
    _.remove(this.rows[this.rows.length - 1], function(o): any {
      return o === undefined;
    });
    console.log(this.rows);
  }

  isDate(value: string): boolean {
    const datedValue = moment(value);
    return (datedValue.isValid() && isNaN(Number(value)));
  }

}
