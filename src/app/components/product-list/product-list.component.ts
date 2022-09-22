import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private httpDataService : HttpDataService) {

    this.httpDataService.getData().subscribe((res: any) => {
      this.allProducts.data=res;
      })
   }

  ngOnInit(): void {
    this.products = [];
    if (localStorage.getItem('PRODUCTS') != null) {
      this.products = JSON.parse(localStorage.getItem('PRODUCTS')!);
    }

    if (localStorage.getItem('PRODUCTS') != null) {
      this.cartProducts = JSON.parse(localStorage.getItem('PRODUCTS')!);
    }
// this.httpDataService.changeCartCount.subscribe((res:any)=>{
//   this.cartProducts = JSON.parse(localStorage.getItem('PRODUCTS')!);

//   this.httpDataService.changeCartCount.next(this.cartProducts.length);

// })

  }
  cartProducts:any=[];
  allProducts:any=[];
 products:any=[];
 already:boolean=false;
addToCart(product:any){
  this.already=false;
  if (this.products.length == 0) {
      this.products.push(product);
      localStorage.setItem('PRODUCTS', JSON.stringify(this.products));

      this.httpDataService.getData().subscribe((res: any) => {
        this.allProducts.data=res;
        })
        
      return;
    }
    else{
      this.products.forEach((element:any) => {
            if(element.id == product.id){
           this.already=true;
            }
          });
          if(this.already){
            alert("Product Already Exists In Cart");
            return;
          }
          else{
            this.products.push(product);
            localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
        
            this.products=[];
            this.products = JSON.parse(localStorage.getItem('PRODUCTS')!);
  this.httpDataService.changeCartCount.next(this.cartProducts.length);
          }
         
    }
   
}

// if (this.allUsers.length == 0) {
//   this.allUsers.push(this.registrationForm.value)
//   localStorage.setItem('USERS', JSON.stringify(this.allUsers));
//   this.router.navigate(['/login'])
//   return;
// }
// else {
//   this.allUsers.forEach((element:any) => {
//     if(element.email == this.registrationForm.controls['email'].value){
//       alert("Email Already Exists");
//       return;
//     }
//   });
//   this.allUsers.push(this.registrationForm.value);
//   localStorage.setItem('USERS', JSON.stringify(this.allUsers));
//   this.router.navigate(['/login'])
// }

}
