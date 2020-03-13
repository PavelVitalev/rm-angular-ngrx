import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { EditorModule } from '@app/modules/editor/editor.module';
import { BoardComponent } from './board.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { ColumnComponent } from './components/column/column.component';
import { SubscibedUsersComponent } from '@app/components/subscibed-users/subscibed-users.component';
import { TaskComponent } from './components/column/componens/task/task.component';
import { TaskEditorDialogComponent } from '@app/components/task-editor-dialog/task-editor-dialog.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    ColumnComponent,
    SubscibedUsersComponent,
    TaskComponent,
    TaskEditorDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    BoardRoutingModule,
  ]
})
export class BoardModule { }
