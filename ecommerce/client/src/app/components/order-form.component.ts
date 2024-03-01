import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { LineItem } from '../models';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  form!: FormGroup;
  @Input() 
  productId!: string;
  @Input() 
  lineItemName!: string;
  @Input() 
  lineItemPrice!: number;

  constructor(private fb: FormBuilder, private store: CartStore) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addToCart(): void {

    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value.quantity,
      name: this.lineItemName,
      price: this.lineItemPrice,
    };

    this.store.addToStore(lineItem);
    this.form = this.createForm();
  }
}