import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from '@app/pages/pages.component';

import { AuthGuard } from '@app/core/guards/auth.guard';


const routes: Routes = [
  { path: '',   redirectTo: 'boards', pathMatch: 'full' },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/sign-Up.module').then(m => m.SignUpModule),
      },
      {
        path: 'boards',
        loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'board/:id',
        loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
        // canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
