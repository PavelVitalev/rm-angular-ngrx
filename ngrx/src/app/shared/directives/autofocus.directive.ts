import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
  @Input('appAutofocus') set appAutofocus(condition: boolean) {
    this._autofocus = condition !== false;
  }

  private _autofocus: boolean;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this._autofocus || typeof this._autofocus === 'undefined') {
      this.el.nativeElement.focus();
    }
  }
}
