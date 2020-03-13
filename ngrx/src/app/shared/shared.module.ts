import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EmailValidateDirective } from '@app/shared/directives/email-validate.directive';

import { FontawesomeModule } from '@app/shared/fontawesome/fontawesome.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { LoaderModule } from './components/loader/loader.module';
import { DeleteButtonModule } from '@app/shared/components/delete-button/delete-button.module';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [
    EmailValidateDirective,
    AutofocusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FontawesomeModule,
    LoaderModule,
    DeleteButtonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FontawesomeModule,
    LoaderModule,
    DeleteButtonModule,
    AutofocusDirective,
  ]
})
export class SharedModule {}
