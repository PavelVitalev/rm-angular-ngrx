import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/internal/operators';

import { AppState } from '@root-store/state';
import * as BoardSelectors from '@root-store/board/selectors/board.selectors';

import * as BoardActions from '@root-store/board/actions/board.actions';
import { getBoards } from '@root-store/boards/selectors/boards.selectors';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  columnTitleControl: FormControl = this.fb.control('');

  getBoardState$;
  getBoard$;

  isOpenCreate = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(take(1))
    .subscribe((params) => {
      this.store.dispatch(BoardActions.checkBoard({data: params.get('id')}));
    });

    this.getBoardState$ = this.store.select(BoardSelectors.getBoardState);
    this.getBoard$ = this.store.select(BoardSelectors.getBoard);

    this.store.select(getBoards).subscribe((e) => {
      // console.warn(e);
    });

    this.getBoard$.subscribe((e) => {
      // console.warn(e);
    });
  }

  public trackById(index: number, element): number {
    return element._id;
  }

  public openCreator(): void {
    this.isOpenCreate = true;
  }

  public closeCreator(): void {
    this.columnTitleControl.patchValue('');
    this.isOpenCreate = false;
  }


  public onCreateColumn(): void {
    if (!(this.columnTitleControl.value.trim && this.columnTitleControl.value.trim())) {
      this.columnTitleControl.patchValue('');
      this.closeCreator();
      return;
    }

    const data = {
      templateColumnId: new Date().getTime().toString(),
      columnTitle: this.columnTitleControl.value
    };
    this.closeCreator();

    this.store.dispatch(BoardActions.createColumn({data}));

  }

  public cancelCreateColumn(): void {

  }


}
