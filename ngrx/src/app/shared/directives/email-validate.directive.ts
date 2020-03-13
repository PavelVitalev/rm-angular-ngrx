import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

export function emailValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const isValidEmail = reg.test(control.value);

    return isValidEmail ? null : { emailInvalid: true };
  };
}

export function isEmptyValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    let value;
    if (control.value && control.value.trim) {
      value = control.value.trim();
    }
    return value ? null : { required: true };
  };
}



@Directive({
  selector: '[appEmailValidate]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidateDirective, multi: true}]
})
export class EmailValidateDirective {
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidation()(control);
  }
}
