import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BoardEffects } from './effects/board.effects';
import { reducer } from '@root-store/board/reducers/board.reducer';
import { ColumnEffects } from './effects/column.effects';
import { TaskEffects } from './effects/task.effects';
import { CommentEffects } from './effects/comment.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('board', reducer),
    EffectsModule.forFeature([BoardEffects, ColumnEffects, TaskEffects, CommentEffects])
  ]
})
export class BoardModule { }
