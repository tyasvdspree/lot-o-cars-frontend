import { Location } from './location.model';

export class User {

    constructor(
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        phonenumber: string,
        emailaddress: string,
        brokerFee: Number,
        roles: String
    ){
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.emailaddress = emailaddress;
        this.brokerFee = brokerFee
        this.role = roles
    }

    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    emailaddress: string;
    location: Location;
    role: String;
    brokerFee: Number;
    active: boolean;

    isAdmin() : Boolean {
        return this.role == "ADMIN";
    }
}

export function isAdminUser(user: User): boolean {
    return user.role == "ADMIN";
}
