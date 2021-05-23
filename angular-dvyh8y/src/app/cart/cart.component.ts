import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService} from '../cart.service';
//imported the cart.service so it can be used in this file

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  //transfers all the items from the cartService to the items variable in this file
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  })

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { }

  onSubmit(): void{//this method handles the name and address inputs sent from the user
  //process checkout data here
  this.items = this.cartService.clearCart();
  console.warn('Your order has been submitted', this.checkoutForm.value);
  this.checkoutForm.reset();
  }
  ngOnInit() {
  }

}