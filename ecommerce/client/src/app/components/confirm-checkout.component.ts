import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.css']
})
export class ConfirmCheckoutComponent implements OnInit {
  form!: FormGroup;
  cart!: Cart;
  order: Order = {
    name: "",
    address: "",
    priority: false,
    comments: "",
    cart: this.cart,
  };

  constructor(private fb: FormBuilder, private router: Router, private svc: ProductService, private store: CartStore) {
    this.cart = { lineItems: [] };
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.store.getAllItems.subscribe((lineItems: LineItem[]) => {
      this.cart.lineItems = lineItems;
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['false', [Validators.required]],
      comments: [''],
    });
  }

  calculateTotalPrice(): number {
    return this.cart?.lineItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  }

  pressed(): void {
    this.order.name = this.form.value["name"];
    this.order.address = this.form.value["address"];
    this.order.priority = this.form.value["priority"];
    this.order.comments = this.form.value["comments"];
    this.order.cart = this.cart;
    this.svc.checkout(this.order);
    this.router.navigate(["/"]);
  }
}