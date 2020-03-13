import { Component, Input, OnInit } from '@angular/core';
import { Task } from '@app/models/task';

import { MatDialog } from '@angular/material/dialog';
import { TaskEditorDialogComponent } from '@app/components/task-editor-dialog/task-editor-dialog.component';
import { TaskService } from '@app/pages/board/components/column/componens/task/services/task.service';
import { Store } from '@ngrx/store';
import { AppState } from '@root-store/state';

import * as BoardActions from '@root-store/board/actions/board.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  @Input() columnId: string;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TaskEditorDialogComponent, {
      data: {
        task: this.task,
        columnId: this.columnId
      },
    } as any);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      // console.log('The dialog was closed');
    });
  }

  public deleteTask(event): void {
    event.stopPropagation();

    const data = {
      columnId: this.columnId,
      taskId: this.task._id
    };

    this.store.dispatch(BoardActions.deleteTask({data}));
  }

  public trackById(index: number, element): number {
    return element._id;
  }
}
