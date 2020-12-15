import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {

  user:User;
  
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUser()
      .subscribe(data => this.user = data);
  }

}
