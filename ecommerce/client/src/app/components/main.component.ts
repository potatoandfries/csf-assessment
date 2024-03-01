import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../product.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  // NOTE: you are free to modify this component
  constructor(private prodSvc:ProductService,private router:Router){}


  categories$!: Observable<string[]>

  ngOnInit(): void {
    this.categories$ = this.prodSvc.getProductCategories()
  }

  viewCategory(c: string) {
       this.router.navigate(["/category",c]);
  }
}
