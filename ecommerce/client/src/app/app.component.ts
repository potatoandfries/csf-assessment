import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import {Observable, map} from 'rxjs';
import { Router } from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  // NOTE: you are free to modify this component
  constructor(private router:Router,private store:CartStore){}

  

  itemCount!: number;

  ngOnInit() {
    this.store.getAllItems.subscribe((items) => {
      this.itemCount = items.filter((item, index, self) => index === self.findIndex(i => i.name === item.name)).length;
    });
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }

  
}
