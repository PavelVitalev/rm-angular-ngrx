import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '@root-store/state';
import * as BoardsSelectors from '@root-store/boards/selectors/boards.selectors';
import * as BoardsActions from '@root-store/boards/actions/boards.actions';
import { FormBuilder, FormControl } from '@angular/forms';
import { Board } from '@app/models/board';



@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  newBoardTitleControl = this.fb.control('');

  getBoardsState$;
  getBoards$;
  boards: Board[];


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.checkBoards());
    this.getBoardsState$ = this.store.select(BoardsSelectors.getBoardsState);
    this.getBoards$ = this.store.select(BoardsSelectors.getBoards);

    this.getBoardsState$.subscribe((e) => {
      // console.log(e);
    });
    // console.log(this.getBoards$);
    // this.getBoards$.subscribe((e) => {
      // console.log(e);
    // });

  }

  public openCreator(): void {
    this.store.dispatch(BoardsActions.openBoardCreator());
  }

  public closeCreator(): void {
    this.newBoardTitleControl.patchValue('');
    this.store.dispatch(BoardsActions.closeBoardCreator());
  }
  public sendCreateBoard(): void {
    if (!(this.newBoardTitleControl.value.trim && this.newBoardTitleControl.value.trim())) {
      this.newBoardTitleControl.patchValue('');
      this.closeCreator();
      return;
    }

    this.store.dispatch(BoardsActions.createBoard({data: this.newBoardTitleControl.value}));
    this.closeCreator();
  }

  public cancelCreate(): void {
    this.closeCreator();
  }

  public trackById(index: number, element): number {
    return element._id;
  }

}
