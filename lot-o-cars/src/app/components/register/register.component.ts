import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  user: User = new User("","");

  constructor(private service: RegisterService) { }

  ngOnInit(): void {
  }

  public register(){
    let response = this.service.register(this.user);
    response.subscribe()
  }
}
