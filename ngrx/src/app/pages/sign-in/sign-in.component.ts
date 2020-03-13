import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/index';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SignInService as LocalSignInService } from '@app/pages/sign-in/services/sign-in.service';
import { AppState } from '@root-store/state';

import { Auth } from '@root-store/auth/state';
import * as AuthSelectors from '@root-store/auth/selectors/auth.selectors';
import * as AuthActions from '@root-store/auth/actions/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  signInForm: FormGroup;

  getState$: Observable<Auth>;

  get email(): FormGroup {
    return this.signInForm.get('email') as FormGroup;
  }

  get password(): FormGroup {
    return this.signInForm.get('password') as FormGroup;
  }

  constructor(
    private localSignInService: LocalSignInService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.signInForm = this.localSignInService.createForm();
    this.getState$ = this.store.select(AuthSelectors.getAuth);

    // this.getState$.subscribe((e) => {
    //   console.log(e);
    // });
  }

  public getErrorMessage(control: FormGroup): string {
    return this.localSignInService.getErrorMessage(control);
  }

  public onSignIn(): void {
    this.store.dispatch(AuthActions.auth({data: this.signInForm.value}));
  }

}
