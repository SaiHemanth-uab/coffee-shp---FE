import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { MsAuthFormModule } from 'ms-auth-form';

@NgModule({
  imports: [
    CommonModule,
    MsAuthFormModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
  ],
  declarations: [SignupPage],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupPageModule {}
