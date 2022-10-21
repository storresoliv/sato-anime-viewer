import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.routes';

import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: APP_ROUTES.HOME,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
