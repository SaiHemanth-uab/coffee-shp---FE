import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartSectionPageRoutingModule } from './cart-section-routing.module';

import { CartSectionPage } from './cart-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartSectionPageRoutingModule
  ],
  declarations: [CartSectionPage]
})
export class CartSectionPageModule {}
