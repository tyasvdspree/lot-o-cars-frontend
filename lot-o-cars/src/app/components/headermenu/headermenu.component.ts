import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss']
})
export class HeadermenuComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authenticationService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authenticationService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn =  this.authenticationService.isLoggedIn();
    this.username = this.authenticationService.getUserName();
  }

  logout(): void {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

}
