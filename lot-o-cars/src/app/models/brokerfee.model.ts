import { Status } from '../enums/status.enum';
import {User} from './user.model';

export class BrokerfeeRequest {
    id : Number;
    originalFee : Number;
    proposedFee : Number;
    user : User;
    status : Status;
    reason : String;
  }