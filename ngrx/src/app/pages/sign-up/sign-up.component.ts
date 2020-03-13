import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/index';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SignUpService as LocalSignUpService } from '@app/pages/sign-up/services/sign-up.service';
import { AppState } from '@root-store/state';

import { Auth } from '@root-store/auth/state';

import * as AuthSelectors from '@root-store/auth/selectors/auth.selectors';
import * as AuthActions from '@root-store/auth/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  signUpForm: FormGroup;

  getState$: Observable<Auth>;

  get email(): FormGroup {
    return this.signUpForm.get('email') as FormGroup;
  }

  get password(): FormGroup {
    return this.signUpForm.get('password') as FormGroup;
  }

  constructor(
    private localSignUpService: LocalSignUpService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.signUpForm = this.localSignUpService.createForm();
    this.getState$ = this.store.select(AuthSelectors.getAuth);
  }

  public getErrorMessage(control: FormGroup): string {
    return this.localSignUpService.getErrorMessage(control);
  }

  public onSignIn(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.signUp({data: this.signUpForm.value}));
  }

}
