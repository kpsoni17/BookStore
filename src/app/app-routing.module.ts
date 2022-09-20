import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { OutHomeComponent } from './components/out-home/out-home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:OutHomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductListComponent,canActivate: [LoginGuard]},
  {path:'productsManagment',component:ProductsPageComponent,canActivate: [LoginGuard]},
  {path:'allProducts',component:ProductListComponent,canActivate: [LoginGuard]},

  

  {path:'mycart',component:CartComponent,canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
