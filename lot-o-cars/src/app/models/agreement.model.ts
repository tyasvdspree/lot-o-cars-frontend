import {Car} from './car.model';
import {User} from './user.model';

export class Agreement {
  id: number;
  car: Car;
  renter: User;
  rentee: User;
  startDate: Date;
  endDate: Date;
  rentPricePerHour: number;
  brokerFee: number;
  isPayed: boolean;
}
