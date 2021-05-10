import { Component, OnInit } from '@angular/core';
import { AddBtn } from '../../resources/custom-configs/buttons/add-btn';
import { Location } from '@angular/common';
import { UsersService } from '../../resources/services/model-services/users.service';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../resources/services/model-services/vehicle.service';
import * as moment from 'moment';
import { VehicleClass } from '../../resources/models/vehicle-class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  addBtn = AddBtn;

  actionType: string;
  theClass: string;

  classService: any;
  object: any;
  keys: any;

  error = false;
  errMsg: string;

  emitter = new EventEmitter<any>();

  constructor(
    private location: Location,
    private userService: UsersService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getClass();
    this.getActionType();
    this.getObject();
  }

  actionDispatcher(action: string): void {
    this.error = false;
    if (action !== 'cancel') {
      for (let i = 1; i < this.keys.length; i++) {
        if (typeof this.object[this.keys[i]] === 'string') {
          if (!this.object[this.keys[i]].trim()) {
            this.error = true;
            this.errMsg = 'You must fill the required fields';
          }
        } else {
          if (this.object[this.keys[i]] === null) {
            this.error = true;
            this.errMsg = 'You must fill the required fields';
          }
        }
      }
      if (!this.error) {
        if (this.actionType === 'add') {
          {
            this.classService.add(this.object).subscribe(
                result => {
                  console.log(result);
                  this.back();
                },
                error => {
                  console.log(error);
                });
          }
        } else {
          this.classService.update(this.object)
            .subscribe(_ => {
              this.back();
            });
        }
      }
    } else {
      this.back();
    }
  }

  getClass(): void {
    this.theClass = this.route.snapshot.paramMap.get('class');
    switch (this.theClass) {
      case 'customer':
        this.classService = this.userService;
        this.object = {firstName: '', lastName: '', email: '', username: '' , birthDate: new Date(), password: ''};
        this.object.birthDate = moment.utc(this.object.birthDate).format('YYYY-MM-DD');
        break;
      case 'vehicle':
        this.classService = this.vehicleService;
        this.object = new VehicleClass(null, '', '', '', '', null);
        break;
      default:
        console.log('Ops');
        break;
    }
    this.keys = Object.keys(this.object);
  }

  getActionType(): void {
    this.actionType = this.route.snapshot.paramMap.get('action');
  }

  getObject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id !== 0) {
      this.classService.getById(id)
        .subscribe(obj => this.object = obj);
    }
  }

  back(): void {
    this.location.back();
  }

  isDate(value: any): boolean {
    const datedValue = moment(value);
    return (datedValue.isValid());
  }
}
