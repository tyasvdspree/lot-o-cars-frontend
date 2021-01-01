import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})

export class UserpageComponent implements OnInit {
  user:User;
  firstnameInput: string;
  lastnameInput: string;
  phonenumberInput: string;
  emailaddressInput: string;
  passwordInput: string;
  subscription: Subscription;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._userService.getUser()
      .subscribe(data => {
        this.user = data;
      }
      );
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/userpage';
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

  public editUser(): void {
    this.subscription = this._userService.editUser(this.user).subscribe(
      response => {      
        this.user.firstname = this.firstnameInput;
        this.user.lastname = this.lastnameInput;
        this.user.phonenumber = this.phonenumberInput;
        this.user.emailaddress = this.emailaddressInput;
        this.user.password = this.passwordInput;
        this.toastr.success('Gewijzigd', 'Success');
        this.redirectTo(this.returnUrl);
      },
      error => {
        this.toastr.error('Registratie mislukt', 'Error');
      }
    )
  }
}
