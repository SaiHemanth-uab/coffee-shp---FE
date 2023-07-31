import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { NewitemComponent } from './sub-category/newitem/newitem.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage,SubCategoryComponent,NewitemComponent]
})
export class DashboardPageModule {}
