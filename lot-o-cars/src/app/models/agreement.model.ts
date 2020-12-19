import { Car } from "./car.model";
import { User } from "./user.model";

export class Agreement {
  id: number;
  carId: number;
  car: Car;
  renterId: number;
  renter: User;
  renteeId: number;
  rentee: User;
  startDate: Date;
  endDate: Date;
  rentPricePerHour: number;
  brokerFee: number;
  isPayed: boolean;
}


// private Long id;
// private Car car;
// private User renter;
// private User rentee;
// private Date startDate;
// private Date endDate;
// private double rentPricePerHour;
// private double brokerFee;
// private boolean isPayed;