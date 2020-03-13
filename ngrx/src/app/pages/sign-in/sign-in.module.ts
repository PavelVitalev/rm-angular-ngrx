import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { SignInRoutingModule } from './sign-in-routing.module';

import { SignInService } from '@app/pages/sign-in/services/sign-in.service';

import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SharedModule,
    SignInRoutingModule
  ],
  providers: [SignInService]
})
export class SignInModule { }
