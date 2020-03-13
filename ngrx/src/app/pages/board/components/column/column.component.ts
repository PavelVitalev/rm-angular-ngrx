import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ColumnService } from '@app/pages/board/components/column/services/column.service';

import * as BoardActions from '@root-store/board/actions/board.actions';

import { AppState } from '@root-store/state';
import { DNDData } from '@app/models/board';
import { Column } from '@app/models/column';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers:  [ ColumnService ]
})
export class ColumnComponent implements OnInit {
  @Input()
  set columnData(column: Column) {
    this._column = column;
  }

  isOpenEditior$;
  isOpenCreator$;

  columnTitleControl: FormControl = this.fb.control('');
  newTaskTitleControl: FormControl = this.fb.control('');

  private _column;

  get column(): Column {
    return this._column;
  }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private columnService: ColumnService
  ) { }

  ngOnInit(): void {
    this.isOpenEditior$ = this.columnService.getIsOpenEditor();
    this.isOpenCreator$ = this.columnService.getIsOpenCreator();
  }

  public drop(event: CdkDragDrop<string[]>): void {
    const sourceCoumnId = event.previousContainer.element.nativeElement.getAttribute('column-id');
    const destinationCoumnId = event.container.element.nativeElement.getAttribute('column-id');

    const data: DNDData = {
      source: {
        droppableId: sourceCoumnId,
        index: event.previousIndex
      },
      destination: {
        droppableId: destinationCoumnId,
        index: event.currentIndex
      }
    } as DNDData;

    if (data.source.index === data.destination.index && data.source.droppableId === data.destination.droppableId) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.store.dispatch(BoardActions.dragAndDrop({data}));
  }

  public openEditor(): void {
    this.columnService.setIsOpenEditor(true);
    this.columnTitleControl.patchValue(this.column.title);
  }

  public onEditTitle(): void {
    if (this.columnTitleControl.value === this.column.title) {
      this.closeEditor();
      return;
    }

    if (!(this.columnTitleControl.value.trim && this.columnTitleControl.value.trim())) {
      this.columnTitleControl.patchValue(this.column.title);
      this.closeEditor();
      return;
    }

    const updatedColumn = { ...this.column, title: this.columnTitleControl.value};

    this.store.dispatch(BoardActions.updateColumnTitle({data: updatedColumn}));

    this.closeEditor();
  }

  public keyEsc(): void {
    this.columnTitleControl.patchValue(this.column.title);
    this.closeEditor();
  }

  public openCreator(): void {
    this.columnService.setIsOpenCreator(true);
  }

  public cancelCreate(): void {
    this.newTaskTitleControl.patchValue('');
    this.closeCreator();
  }

  public sendCreateTask(): void {
    if (!(this.newTaskTitleControl.value.trim && this.newTaskTitleControl.value.trim())) {
      this.newTaskTitleControl.patchValue('');
      this.closeCreator();
      return;
    }

    const templateTaskId = new Date().getTime().toString();

    const data = {
      columnId: this.column._id,
      templateTaskId,
      task: this.newTaskTitleControl.value
    };

    this.newTaskTitleControl.patchValue('');
    this.closeCreator();

    this.store.dispatch(BoardActions.createTask({data}));
  }

  public deleteColumn(): void {
    this.store.dispatch(BoardActions.deleteColumn({data: this.column._id}));
  }

  private closeEditor(): void {
    this.columnService.setIsOpenEditor(false);
  }

  private closeCreator(): void {
    this.columnService.setIsOpenCreator(false);
  }

  public trackById(index: number, element): number {
    return element._id;
  }
}
