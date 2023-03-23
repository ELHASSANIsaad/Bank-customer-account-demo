import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingCustomersComponent } from './listing-customers/listing-customers.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'customer-detail/:id',
    component: CustomerDetailsComponent,
  },
  {
    path: 'details/:id',
    component: CustomerDetailsComponent,
  },
  {
    path: 'listing-customer',
    component: ListingCustomersComponent,
  },
  {
    path: 'update-customer/:id',
    component: UpdateCustomerComponent,
  },
  {
    path: 'customer-form',
    component: CustomerFormComponent,
  },
  {
    path: 'customer-form/:id',
    component: CustomerFormComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
