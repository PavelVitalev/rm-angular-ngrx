import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@root-store/state';
import { ReplaySubject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

import * as BoardSelectors from '@root-store/board/selectors/board.selectors';
import { BoardHeaderService } from '@app/pages/board/components/board-header/services/board-header.service';
import { Board } from '@app/models/board';
import * as BoardActions from '@root-store/board/actions/board.actions';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
  providers: [BoardHeaderService]
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  board$;

  isOpenEditior$;

  boardTitleControl: FormControl = this.fb.control('');

  boardTitle = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private boardHeaderService: BoardHeaderService
  ) { }

  ngOnInit(): void {
    this.board$ = this.store.select(BoardSelectors.getBoard);

    this.isOpenEditior$ = this.boardHeaderService.getIsOpenEditor();

    this.board$
      .pipe(takeUntil(this.destroy))
      .subscribe((board: Board) => {
        if (board && board.title) {
          this.boardTitle = board.title;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public onSubscribe(): void {
    this.store.dispatch(BoardActions.subscribeOnBoard());
  }

  public openEditor(): void {
    this.boardHeaderService.setIsOpenEditor(true);
    this.boardTitleControl.patchValue(this.boardTitle);
  }

  public onEditTitle(): void {
    if (this.boardTitleControl.value === this.boardTitle) {
      this.closeEditor();
      return;
    }

    if (!(this.boardTitleControl.value.trim && this.boardTitleControl.value.trim())) {
      this.boardTitleControl.patchValue(this.boardTitle);
      this.closeEditor();
      return;
    }

    this.store.dispatch(BoardActions.updateBoardTitle({data: this.boardTitleControl.value}));

    this.closeEditor();
  }

  public keyEsc(): void {
    this.boardTitleControl.patchValue(this.boardTitle);
    this.closeEditor();
  }

  public deleteBoard(): void {
    this.store.dispatch(BoardActions.deleteBoard());
  }

  private closeEditor(): void {
    this.boardHeaderService.setIsOpenEditor(false);
  }
}
