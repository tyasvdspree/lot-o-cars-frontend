import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  disabledAgreement: boolean = true;
  changeCheck(event){
    this.disabledAgreement = !event.checked;
  }
  
  user: User = new User("","");

  constructor(private service: RegisterService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public register(){
    debugger;
    let response = this.service.register(this.user);

    response.subscribe(
      response => {
        console.log(response);
        this.toastr.success('Geregistreerd', 'Success');
      },
      error => {
        this.toastr.success('Registratie mislukt', 'Error');
      }
    );   

   
  }

}
