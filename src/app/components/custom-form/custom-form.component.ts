import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersService} from '../../resources/services/model-services/users.service';
import {VehicleService} from '../../resources/services/model-services/vehicle.service';
import {SaveBtn} from '../../resources/custom-configs/buttons/save-btn';
import * as _ from 'lodash';
import * as moment from 'moment';
import {CancelBtn} from '../../resources/custom-configs/buttons/cancel-btn';
import {ActionWrapper} from '../../resources/models/action-wrapper';
import {EditBtn} from '../../resources/custom-configs/buttons/edit-btn';
import {EditPswBtn} from '../../resources/custom-configs/buttons/edit-psw-btn';

interface Row {
  items: string[];
}

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})

export class CustomFormComponent implements OnInit {
  @Input() obj: any;
  @Input() objClass: string;
  @Input() disabled: boolean;

  @Output() emitter = new EventEmitter<any>();

  saveBtn = SaveBtn;
  cancelBtn = CancelBtn;
  editBtn = EditBtn;
  editPswd = EditPswBtn;

  rows: Row[] = [];
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
      console.log(i);
      const row: Row = {items: []};
      row.items.push(this.objKeys[i]);
      row.items.push(this.objKeys[i + 1]);
      console.log(row);
      this.rows.push(row);
    }
    console.log(this.rows[this.rows.length - 1].items);
    // tslint:disable-next-line:only-arrow-functions
    _.remove(this.rows[this.rows.length - 1].items, function(o): any {
      return o === undefined;
    });
    console.log(this.rows);
  }

  isDate(value: string): boolean {
    const datedValue = moment(value);
    return (datedValue.isValid() && isNaN(Number(value)));
  }

  btnClick(action: string): void {
    if (action === 'save') {
      this.emitter.emit(this.obj);
    } else {
      this.emitter.emit(action);
    }
  }

}
