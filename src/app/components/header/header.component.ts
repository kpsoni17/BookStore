import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
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
navigateToRegister(){
  this.router.navigateByUrl('/register')
}

navigateToProducts(){
  this.router.navigateByUrl('/productsManagment')

}
}
