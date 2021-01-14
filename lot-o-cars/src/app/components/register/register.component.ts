import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debug } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit, OnDestroy {
  disabledAgreement = true;
  user: User = new User('', '', '', '', '', '');
  subscription: Subscription;

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeCheck(event): void {
    this.disabledAgreement = !event.checked;
  }

  public register(): void {
    this.subscription = this.registerService.checkIfUsernameExists(this.user.username).subscribe(
      response => {
        if (response === false){
          this.subscription = this.registerService.register(this.user).subscribe(
            response => {
              this.toastr.success('Geregistreerd', 'Success');
              this.router.navigate(['/login']);
            },
            error => {
              this.toastr.error('Registratie mislukt', 'Error');
            }
          );
        }
        else{
          this.toastr.error('Username bestaat al', 'Error');
        }
      }
    )
  }
}
