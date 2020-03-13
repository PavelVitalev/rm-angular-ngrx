import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@root-store/state';

import * as BoardsActions from '@root-store/boards/actions/boards.actions';

import * as AuthActions from '@root-store/auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.chechAuthByToken());
    this.store.dispatch(BoardsActions.loadBoards());
  }
}
