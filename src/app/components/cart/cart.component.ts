import { Component, Input, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // @Input() item = '';
  constructor(private service : HttpDataService) { }
  cartProducts: any = [];
  ngOnInit(): void {
    this.cartProducts = [];
    if (localStorage.getItem('PRODUCTS') != null) {
      this.cartProducts = JSON.parse(localStorage.getItem('PRODUCTS')!);
    }
    this.service.changeCartCount.next(this.cartProducts.length)

  }
  removeItem(ItemId: any) {
    if (confirm("DO YOU WANT TO REMOVE THIS FROM CART")) {
      console.log("yes called");
      let index = this.cartProducts.indexOf(ItemId);
      this.cartProducts.splice(index, 1);

      localStorage.setItem('PRODUCTS', JSON.stringify(this.cartProducts));
      this.cartProducts = JSON.parse(localStorage.getItem('PRODUCTS')!);
      console.log(this.cartProducts, 'jjjj');
      // this.item=this.cartProducts.length;
      this.service.changeCartCount.next(this.cartProducts.length)
      
      return;
    }
    else {
      console.log("NO CALLED");

    }
  }
}
