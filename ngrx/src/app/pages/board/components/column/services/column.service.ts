import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';

@Injectable()
export class ColumnService {
  isOpenEditor = new BehaviorSubject<boolean>(false);

  isOpenCreator = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setIsOpenEditor(value: boolean) {
    this.isOpenEditor.next(value);
  }

  public getIsOpenEditor(): Observable<boolean> {
    return this.isOpenEditor.asObservable();
  }

  public setIsOpenCreator(value: boolean) {
    this.isOpenCreator.next(value);
  }

  public getIsOpenCreator(): Observable<boolean> {
    return this.isOpenCreator.asObservable();
  }
}
