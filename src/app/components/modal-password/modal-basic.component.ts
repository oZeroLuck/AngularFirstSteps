import {Component, EventEmitter, Input, Output} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditPswBtn} from '../../resources/custom-configs/buttons/edit-psw-btn';
import {SaveBtn} from '../../resources/custom-configs/buttons/save-btn';
import {UserClass} from '../../resources/models/user-class';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})
export class ModalBasicComponent{
  @Input() user: UserClass;
  @Output() emitter = new EventEmitter<any>();
  saveBtn = SaveBtn;
  pswdBtn = EditPswBtn;

  error = false;
  errMsg = 'Current password is wrong';
  confirmError: boolean;
  confirmErrorMsg = '"New" and "confirm" are different';
  sameError = false;
  sameErrorMsg = 'New password cannot be same as current password';
  empty = false;
  emptyMsg = 'These fields must be filled';

  constructor(private modalService: NgbModal) {}

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  saveClicked(currentPswd: string, newPswd: string, confirmPswd: string): void {
    let errors = false;
    if (!(currentPswd.trim() && newPswd.trim() && confirmPswd.trim())) {
      this.empty = true;
    }
    if (newPswd !== confirmPswd) {
      this.confirmError = true;
    }
    if (this.error || this.sameError || this.confirmError || this.empty) {
      errors = true;
    }
    if (!errors) {
      this.emitter.emit({current: currentPswd, new: newPswd, confirm: confirmPswd});
      this.modalService.dismissAll();
    }
  }

  resetErrors(event: boolean): void {
    this.error = event;
    this.sameError = event;
    this.confirmError = event;
    this.empty = event;
  }

}
