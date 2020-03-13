import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidation } from '@app/shared/directives/email-validate.directive';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {


  constructor(
    private fb: FormBuilder,
  ) { }

  public createForm(): FormGroup {
    return this.fb.group({
      email: ['admin@admin.admin', Validators.required],
      password: ['admin', Validators.required],
      name: ['']
    });
  }

  public getErrorMessage(control: FormGroup): string {
    if (!control) {
      return;
    }

    return control.hasError('emailInvalid') ? 'Not a valid email' : '';

    return control.hasError('required') ? 'Field is required' : '';
  }
}
