import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequestPayload } from './login-request.payload';
import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login(): void {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data){
        this.isError = false;
        this.toastr.success('Ingelogd');
        this.router.navigateByUrl(this.returnUrl);

      } else {
        this.isError = true;
      }
    });
  }

}
