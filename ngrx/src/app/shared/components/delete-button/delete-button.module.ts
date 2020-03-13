import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';

import { DeleteButtonComponent } from './delete-button.component';

@NgModule({
  declarations: [DeleteButtonComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [DeleteButtonComponent]
})
export class DeleteButtonModule { }
