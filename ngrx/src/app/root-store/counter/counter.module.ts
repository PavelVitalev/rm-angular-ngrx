import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './effects/counter.effects';
import { StoreModule } from '@ngrx/store';

import { counterReducer } from '@root-store/counter/reducers/counter.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('counter', counterReducer),
    EffectsModule.forFeature([CounterEffects])
  ]
})
export class CounterModule { }
