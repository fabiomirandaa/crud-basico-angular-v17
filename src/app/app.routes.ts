import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoggedGuard } from './auth/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoggedGuard] },
  {
    path: 'entity',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./features/entity/pages/list-entity-page/list-entity-page.component')
            .then(component => component.ListEntityPageComponent)
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./features/entity/pages/form-entity-page/form-entity-page.component')
            .then(component => component.FormEntityPageComponent)
      }
    ],
    canActivate: [AuthGuard]
  },
];
