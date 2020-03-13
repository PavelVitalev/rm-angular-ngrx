import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@root-store/state';

import * as AuthActions from '@root-store/auth/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.logOut());
  }

}
