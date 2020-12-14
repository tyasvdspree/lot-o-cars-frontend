import { Location } from './location.model';

export class User {

    constructor(
        username: string,
        password: string
    ){
        this.username = username;
        this.password = password;
    }

    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    emailaddress: string;
    location: Location;
    roles: any[];
    active: boolean;
}
