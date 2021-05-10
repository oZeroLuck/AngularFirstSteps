import {ReservationClass} from './reservation-class';

export class ResApproveRequest {
  constructor(res: ReservationClass, status: string) {
    this.id = res.id;
    this.status = status;
  }

  id: number;
  status: string;
}
