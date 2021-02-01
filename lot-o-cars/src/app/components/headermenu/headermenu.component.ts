import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { isAdminUser, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss']
})
export class HeadermenuComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  isAdminUser: boolean;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authenticationService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authenticationService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn =  this.authenticationService.isLoggedIn();
    this.username = this.authenticationService.getUserName();
    this.isAdminUser = false;
    if(this.isLoggedIn){
      this.userService.getUser().subscribe((data: User) =>{console.log(isAdminUser(data)); this.isAdminUser = isAdminUser(data)});
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

}
