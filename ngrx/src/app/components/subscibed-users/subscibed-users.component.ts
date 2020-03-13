import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

import { AppState } from '@root-store/state';
import * as BoardSelectors from '@root-store/board/selectors/board.selectors';
import { User } from '@app/models/user';

@Component({
  selector: 'app-subscibed-users',
  templateUrl: './subscibed-users.component.html',
  styleUrls: ['./subscibed-users.component.scss']
})
export class SubscibedUsersComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  users: string[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(BoardSelectors.getBoardSubscribedUsers)
      .pipe(takeUntil(this.destroy))
      .subscribe((users: User[]) => {
        if (!users) {
          return;
        }

        this.users = users.reduce((result, user, i) => {
          if (i < 10) {
            result.push(user.name[0]);
          }

          return result;
        }, []).reverse();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public trackById(index: number, element): number {
    return element._id;
  }
}
