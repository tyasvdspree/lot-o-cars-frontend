import { User } from './user.model';
import { Location } from './location.model';

export class Car {
    id: number;
    userId: number;
    locationId: number;
    numberPlate: string;
    countryCode: string;
    modelYear: string;
    make: string;
    model: string;
    body: string;
    transmission: string;
    color: string;
    fuel: string;
    fuelUsage: number;
    doors: number;
    seats: number;
    bootSpaceInLiters: number;
    navigation: boolean;
    airco: boolean;
    smokingIsAllowed: boolean;
    rentPricePerHour: number;
    isActive: boolean;
    location: Location;
    user: User;
}
