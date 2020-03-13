import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthInterceptor } from '@app/core/interceptors/auth.interceptor';

import { AppComponent } from './app.component';

import { RootStoreModule } from '@app/root-store/root-store.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { HeaderModule } from '@app/modules/header/header.module';
// import { SubscibedUsersComponent } from './components/subscibed-users/subscibed-users.component';

@NgModule({
  declarations: [
    AppComponent,
    // SubscibedUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RootStoreModule,
    SharedModule,
    HeaderModule,

    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
