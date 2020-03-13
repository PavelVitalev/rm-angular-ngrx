import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    // Router,
    PagesRoutingModule,
  ]
})
export class PagesModule {
}
