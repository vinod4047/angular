import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminEmpListComponent } from './admin-emp-list/admin-emp-list.component';
import { ProductsComponent } from './products/products.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { BillingComponent } from './billing/billing.component';
import { AddCusComponent } from './add-cus/add-cus.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CusListEmpComponent } from './cus-list-emp/cus-list-emp.component';
import { CusListAdminComponent } from './cus-list-admin/cus-list-admin.component';
import { OrderListComponent } from './order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { EmpUpdateDialogComponent } from './emp-update-dialog/emp-update-dialog.component';
import { MenubarModule} from 'primeng/menubar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BillCusComponent } from './bill-cus/bill-cus.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PrintComponent } from './print/print.component';
import { DropdownModule } from 'primeng/dropdown';
import { AboutComponent } from './about/about.component';
import { TabViewModule } from 'primeng/tabview';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminEmpListComponent,
    ProductsComponent,
    ShowProductsComponent,
    BillingComponent,
    AddCusComponent,
    EditProductComponent,
    CusListEmpComponent,
    CusListAdminComponent,
    OrderListComponent,
    EmpUpdateDialogComponent,
    BillCusComponent,
    PrintComponent,
    AboutComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    TableModule,
    MenubarModule,
    InputSwitchModule,
    Ng2SearchPipeModule,
    TabViewModule,
    DropdownModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
