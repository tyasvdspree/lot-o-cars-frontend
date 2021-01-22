import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Agreement} from '../../models/agreement.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  agreement: Agreement = new Agreement();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('>>authenticate-username:41:',
      this.router.getCurrentNavigation().extras.state);
  }

}
