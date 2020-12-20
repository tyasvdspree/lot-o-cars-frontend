import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {

  user:User;
  usernameInput: string;
  firstnameInput: string;
  lastnameInput: string;
  phonenumberInput: string;
  emailaddressInput: string;
  passwordInput: string;

  constructor(
    private _userService: UserService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._userService.getUser()
      .subscribe(data => {
        this.user = data;
      }
      );
  }

  public register(): void {
    this.user.username = this.usernameInput;
    this.user.firstname = this.usernameInput;
    this.user.lastname = this.lastnameInput;
    this.user.phonenumber = this.phonenumberInput;
    this.user.emailaddress = this.emailaddressInput;
    this.user.password = this.passwordInput;

    this._userService.editUser(this.user).subscribe();
    this.toastr.success('Gewijzigd', 'Success');
  }
}
