import { Status } from '../enums/status.enum';
import {User} from './user.model';

export class BrokerfeeRequest {
    id : number;
    originalFee : number;
    proposedFee : number;
    user : User;
    status : Status;
    reason : string;

    constructor() {
      this.user = new User('', '', '', '', '', '');
    }
  }