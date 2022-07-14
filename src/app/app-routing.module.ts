import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCusComponent } from './add-cus/add-cus.component';
import { AdminEmpListComponent } from './admin-emp-list/admin-emp-list.component';
import { BillingComponent } from './billing/billing.component';
import { CusListAdminComponent } from './cus-list-admin/cus-list-admin.component';
import { CusListEmpComponent } from './cus-list-emp/cus-list-emp.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:HomeComponent},
  {path:"AEL",component:AdminEmpListComponent},
  {path:"proShow",children:[{path:"",component:ShowProductsComponent},
  {path:"editPro/:id",component:EditProductComponent}]},
  {path:"bill",component:BillingComponent,},
  {path:"cusAdd",component:AddCusComponent},
  {path:"cusEmp",component:CusListEmpComponent},
  {path:"cusAdm",component:CusListAdminComponent},
  {path:"order",component:OrderListComponent},
  {path:'',redirectTo:"login",pathMatch:"full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
