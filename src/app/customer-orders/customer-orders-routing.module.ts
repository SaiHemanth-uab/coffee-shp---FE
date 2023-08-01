import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrdersPage } from './customer-orders.page';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrdersPage
  },
  {
    path:'view-Orders',
    component:ViewOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrdersPageRoutingModule {}
