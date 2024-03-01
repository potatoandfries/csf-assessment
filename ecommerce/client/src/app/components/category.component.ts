import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../models';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // NOTE: you are free to modify this component
  constructor(private prodSvc:ProductService, 
              private activatedRoute :ActivatedRoute,
              private store: CartStore){

  }

  category: string = "not set"

  products$!: Observable<Product[]>

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']
    this.products$ = this.prodSvc.getProductsByCategory(this.category)
  }

  
}
