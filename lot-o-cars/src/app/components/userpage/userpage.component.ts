import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})

export class UserpageComponent implements OnInit {
  isLoggedIn: boolean;
  user: User;
  subscription: Subscription;
  returnUrl: string;
  userEmailAddressExists: boolean;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private toastr: ToastrService
    ) 
    {}
    
  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn() == false) {
      this.redirectTo('/');
    };
    
    this._userService.getUser()
      .subscribe(data => {
        this.user = data;
        this.user.password = "*****"
      }
      );
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/userpage';
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }


  public editUser(): void {
    this.subscription = this._userService.checkIfEmailAddressExists(this.user.id, this.user.emailaddress).subscribe(
      response => {
        if (response === false){
          this.subscription = this._userService.editUser(this.user).subscribe(
            response => {
              this.toastr.success('Gewijzigd', 'Success');
              this.redirectTo(this.returnUrl);
            },
            error => {
              this.toastr.error('Wijziging mislukt', 'Error');
            }
          )
        }
        else{
          this.toastr.error('Emailadres bestaat al', 'Error');
        }
      },
      error => {
        this.toastr.error('Wijziging mislukt', 'Error');
      }
    );
  }
}
