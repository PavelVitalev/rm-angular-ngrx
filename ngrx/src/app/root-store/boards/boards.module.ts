import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BoardsEffects } from './effects/boards.effects';
import { reducer } from '@root-store/boards/reducers/boards.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('boards', reducer),
    EffectsModule.forFeature([BoardsEffects])
  ]
})
export class BoardsModule { }
