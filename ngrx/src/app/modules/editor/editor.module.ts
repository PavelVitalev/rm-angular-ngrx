import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorComponent } from './editor.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
