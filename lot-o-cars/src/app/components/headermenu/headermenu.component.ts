import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss']
})
export class HeadermenuComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;

  constructor(
    private authenticationService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn =  this.authenticationService.isLoggedIn();
    this.username = this.authenticationService.getUserName();
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
