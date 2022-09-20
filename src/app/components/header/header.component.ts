import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service : HttpDataService) { }
  cartProducts:any=[];
  ngOnInit(): void {
    this.cartProducts = [];
    if (localStorage.getItem('PRODUCTS') != null) {
      this.cartProducts = JSON.parse(localStorage.getItem('PRODUCTS')!);
    }
    this.cartCount=this.cartProducts.length;
    // this.service.changeCartCount.subscribe((res:any)=>{
    //   console.log(res,'gggggg');
      
    //   this.cartCount=res;

    // })
    
  }
  cartCount:number=0;

}
