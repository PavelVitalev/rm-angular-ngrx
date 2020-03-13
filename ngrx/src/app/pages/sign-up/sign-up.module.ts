import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { SignUpRoutingModule } from './sign-up-routing.module';

import { SignUpService } from '@app/pages/sign-up/services/sign-up.service';

import { SignUpComponent } from './sign-up.component';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SharedModule,
    SignUpRoutingModule
  ],
  providers: [SignUpService]
})
export class SignUpModule { }
