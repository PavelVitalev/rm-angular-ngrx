import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@env/environment';

import { AuthModule } from '@root-store/auth/auth.module';
import { BoardsModule } from '@root-store/boards/boards.module';
import { BoardModule } from '@root-store/board/board.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    BoardsModule,
    BoardModule,

    StoreModule.forRoot({router: routerReducer}, {
      // runtimeChecks: {
      //   strictStateImmutability: true,
      // }
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', routerState: RouterState.Minimal }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class RootStoreModule { }
