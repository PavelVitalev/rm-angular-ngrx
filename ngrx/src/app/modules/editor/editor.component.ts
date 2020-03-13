import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @Input() formContromName: string;

  @Input() classes: string;

  @Input() placeholder: string;

  @Output() blurAction = new EventEmitter();
  @Output() enterAction = new EventEmitter();
  @Output() escAction = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  focusOut(event) {
    this.blurAction.emit(event);
  }

  keyEnter(event) {
    this.enterAction.emit(event);
  }

  keyEsc(event) {
    this.escAction.emit(event);
  }

}
