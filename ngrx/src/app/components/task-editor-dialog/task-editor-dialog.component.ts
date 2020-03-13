import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/index';
import { FormBuilder, FormControl } from '@angular/forms';
import { take, takeUntil } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Task } from '@app/models/task';
import { User } from '@app/models/user';
import { AppState } from '@root-store/state';
import { Comment } from '@app/models/comment';

import * as BoardActions from '@root-store/board/actions/board.actions';
import * as AuthSelectors from '@root-store/auth/selectors/auth.selectors';

@Component({
  selector: 'app-task-editor-dialog',
  templateUrl: './task-editor-dialog.component.html',
  styleUrls: ['./task-editor-dialog.component.scss']
})
export class TaskEditorDialogComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  users: User[];

  taskName = this.data.task.task;

  task: Task = this.data.task;

  currantUser: User;

  taskNameControl: FormControl = this.fb.control('');
  taskCommentControl: FormControl = this.fb.control('');


  isOpenEditor$ = new BehaviorSubject<boolean>(false);
  isOpenEditor: boolean;

  isOpenMarks$ = new BehaviorSubject<boolean>(false);
  isOpenMarks: boolean;

  marksNames = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<TaskEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.store.select(AuthSelectors.getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
      this.currantUser = user;
      });

    this.getIsOpenEditor()
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
      this.isOpenEditor = value;
    });

    this.getIsOpenMarks()
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.isOpenMarks = value;
      });

  }

  ngOnDestroy(): void {
    this.closeEditor();
    this.closeMarks();
    this.destroy.next(null);
    this.destroy.complete();
  }

  public openEditor(): void {
    this.setIsOpenEditor(true);
    this.taskNameControl.patchValue(this.taskName);
  }

  public closeEditor(): void {
    this.setIsOpenEditor(false);
  }

  public openMarks(): void {
    this.setIsOpenMarks(true);
  }

  public closeMarks(): void {
    this.setIsOpenMarks(false);
  }

  public onEditTitle(): void {
    if (this.taskNameControl.value === this.taskName) {
      this.closeEditor();
      return;
    }

    if (!(this.taskNameControl.value.trim && this.taskNameControl.value.trim())) {
      this.taskNameControl.patchValue(this.taskName);
      this.closeEditor();
      return;
    }

    this.taskName = this.taskNameControl.value;

    const updatedTask = { ...this.task, task: this.taskNameControl.value};

    const data = {
      updatedTask,
      columnId: this.data.columnId
    };

    this.store.dispatch(BoardActions.updateTaskTitle({data}));

    this.closeEditor();
  }

  public keyEsc(): void {
    this.taskNameControl.patchValue(this.taskName);
    this.closeEditor();
  }

  public isCheckedMark(value: string): boolean {
    return this.task.marks.some((mark) => mark === value);
  }

  public getSubsctibedUsers(): User[] {
    return this.task.users.reduce((result, user, i) => {
      if (i < 3) {
        result.push(user.name[0]);
      }

      return result;
    }, []);
  }

  public selectMark(value: string): void {
    const isCheckedMark = this.task.marks.some((checkMark) => checkMark === value);

    if (isCheckedMark) {
      this.task.marks = this.task.marks.filter((checkMark) => checkMark !== value);
    }

    if (!isCheckedMark) {
      this.task.marks.push(value);
    }

    const data = {
      updatedTask: this.task,
      mark: value,
      columnId: this.data.columnId
    };

    this.store.dispatch(BoardActions.updateTaskMarks({data}));
  }

  public onSubscribeOnTask(): void {
    const isSubscribed = this.task.users.some((user) => user._id === this.currantUser._id);

    if (isSubscribed) {
      this.task.users = this.task.users.filter((user) => user._id !== this.currantUser._id);
    }

    if (!isSubscribed) {
      this.task.users.push(this.currantUser);
    }

    const data = {
      updatedTask: this.task,
      userId: this.currantUser._id,
      columnId: this.data.columnId
    };

    this.store.dispatch(BoardActions.updateTaskUsers({data}));
  }

  public sendComment(): void {
    const comment = {
        comment: this.taskCommentControl.value,
        name: this.currantUser.name,
        email: this.currantUser.email,
      };

    const templateCommentId = new Date().getTime().toString();

    this.task.comments.push({
      ...comment,
      taskId: this.task._id,
      _id: templateCommentId
    } as Comment);

    const data = {
      comment,
      columnId: this.data.columnId,
      templateCommentId,
      updatedTask: this.task
    };

    this.store.dispatch(BoardActions.createTaskComment({data}));
  }

  public deleteComment(commentId: string): void {
    this.task.comments = this.task.comments.filter((comment) => comment._id !== commentId);

    const data = {
      columnId: this.data.columnId,
      updatedTask: this.task,
      commentId
    };

    this.store.dispatch(BoardActions.deleteTaskComment({data}));
  }

  public isEmptyComment(): boolean {
    const comment = this.taskCommentControl.value;

    return Boolean(comment && comment.trim && comment.trim().length);
  }

  private setIsOpenEditor(value: boolean): void {
    this.isOpenEditor$.next(value);
  }

  private getIsOpenEditor(): Observable<boolean> {
    return this.isOpenEditor$.asObservable();
  }

  private setIsOpenMarks(value: boolean): void {
    this.isOpenMarks$.next(value);
  }

  private getIsOpenMarks(): Observable<boolean> {
    return this.isOpenMarks$.asObservable();
  }

  public trackById(index: number, element): number {
    return element._id;
  }

  public trackByName(index: number, element: string): string {
    return element;
  }



}
