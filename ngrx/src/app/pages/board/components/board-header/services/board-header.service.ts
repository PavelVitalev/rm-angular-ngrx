import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';

@Injectable()
export class BoardHeaderService {
  isOpenEditor = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setIsOpenEditor(value: boolean) {
    this.isOpenEditor.next(value);
  }

  public getIsOpenEditor(): Observable<boolean> {
    return this.isOpenEditor.asObservable();
  }
}
