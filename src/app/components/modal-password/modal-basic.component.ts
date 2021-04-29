import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {EditPswBtn} from '../../resources/custom-configs/buttons/edit-psw-btn';
import {SaveBtn} from '../../resources/custom-configs/buttons/save-btn';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})
export class ModalBasicComponent{
  saveBtn = SaveBtn;
  pswdBtn = EditPswBtn;
  @Output() emitter = new EventEmitter<any>();

  constructor(private modalService: NgbModal) {}

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  saveClicked(currentPswd: string, newPswd: string, confirmPswd: string): void {
    this.emitter.emit({current: currentPswd, new: newPswd, confirm: confirmPswd});
  }

}
