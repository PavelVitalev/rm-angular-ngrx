import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class SignInService {

  constructor(
    private fb: FormBuilder,
  ) { }

  public createForm(): FormGroup {
    return this.fb.group({
      email: ['admin@admin.admin', Validators.required],
      password: ['admin', Validators.required],
    });
  }

  public getErrorMessage(control: FormGroup): string {
    if (!control) {
      return;
    }

    return control.hasError('required') ? 'Field is required' : '';

    // return control.hasError('emailInvalid') ? 'Not a valid email' : '';
  }

}
