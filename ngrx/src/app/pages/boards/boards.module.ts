import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { SharedModule } from '@app/shared/shared.module';
import { EditorModule } from '@app/modules/editor/editor.module';

@NgModule({
  declarations: [BoardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    BoardsRoutingModule
  ]
})
export class BoardsModule { }
