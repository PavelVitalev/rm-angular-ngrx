import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faSearch, faPlus, faBell, faInfo, faCoffee, faClipboard, faHome } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [FontAwesomeModule]
})
export class FontawesomeModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faClipboard, faSearch, faPlus, faBell, faInfo, faCoffee, faHome);
  }
}
