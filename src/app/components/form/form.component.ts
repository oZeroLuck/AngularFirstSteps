import { Component, OnInit } from '@angular/core';
import { AddBtn } from '../../../resources/custom-configs/buttons/add-btn';
import { CancelBtn } from '../../../resources/custom-configs/buttons/cancel-btn';
import { Location } from '@angular/common';
import { UsersService } from '../../../resources/services/users.service';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditBtn } from '../../../resources/custom-configs/buttons/edit-btn';
import { VehicleService } from '../../../resources/services/vehicle.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  addBtn = AddBtn;
  cancelBtn = CancelBtn;
  editBtn = EditBtn;
  actionType: string;
  classService: any;
  object: any;
  error = false;
  keys: any;

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
    for (let i = 1; i < this.keys.length; i++) {
      if (!this.object[this.keys[i]].trim()) {
        this.error = true;
      }
    }
    if (!this.error) {
      if (action === 'add') {
         {
          this.classService.add(this.object)
            .subscribe(customer => {
              this.emitter.emit(customer);
            });
        }
      } else {
        this.classService.update(this.object)
          .subscribe();
        }
      this.back();
    }
  }

  getClass(): void {
    const theClass = this.route.snapshot.paramMap.get('class');
    switch (theClass) {
      case 'customer':
        this.classService = this.userService;
        this.object = {id: null, name: '', lastName: '', dateOfBirth: new Date()};
        this.object.dateOfBirth = moment(this.object.dateOfBirth).format('YYYY-MM-DD');
        break;
      case 'vehicle':
        this.classService = this.vehicleService;
        this.object = {id: null, plate: '', brand: '', model: '', regYear: null};
        break;
      default:
        console.log('Ops');
    }
    this.keys = Object.keys(this.object);
    console.log(theClass);
  }

  getActionType(): void {
    this.actionType = this.route.snapshot.paramMap.get('action');
  }

  getObject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id !== 0) {
      this.classService.getById(id)
        .subscribe(user => this.object = user);
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
