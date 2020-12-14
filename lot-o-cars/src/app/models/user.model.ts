import { Location } from './location.model';

export class User {

    constructor(
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        phonenumber: string,
        emailaddress: string,
    ){
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.emailaddress = emailaddress;
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
