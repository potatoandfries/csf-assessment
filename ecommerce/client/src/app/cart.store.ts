import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Cart, LineItem } from "./models";


const INIT_STATE = {
    loadedOn: 0,
    lineItems: []
  }
  
export interface CartSlice{
    loadedOn: number;
    lineItems: LineItem[]
}
// Use the following class to implement your store
@Injectable({
    providedIn: 'root'
})
export class CartStore extends ComponentStore<CartSlice>{

    constructor() { super(INIT_STATE) }

    // Mutators
    readonly addToStore = this.updater<LineItem>(
      (slice: CartSlice, value: LineItem) => {
        const newSlice: CartSlice = {
          loadedOn: slice.loadedOn,
          lineItems: []
        }
        for (let i of slice.lineItems) {
          if (i.name === value.name) {
            i.quantity += value.quantity;
            newSlice.lineItems.push(i);
          } else {
            newSlice.lineItems.push(i);
          }
        }
        if (newSlice.lineItems.findIndex(item => item.name === value.name) === -1) {
          newSlice.lineItems.push(value);
        }
        return newSlice;
      }
    );

  readonly loadToStore = this.updater<LineItem[]>(
    (slice: CartSlice, values: LineItem[]) => {
      return {
        loadedOn: (new Date()).getTime(),
        lineItems: values
      } as CartSlice
    }
  )

   // Selectors
   readonly getAllItems = this.select<LineItem[]>(
    (slice: CartSlice) => slice.lineItems
  )

}


