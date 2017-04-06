import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { LoginComponent } from './login.component';

import { SecretHeroesComponent } from './secret-heroes.component';
import { SecretHeroDetailComponent } from './secret-hero-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'secret-heroes',
    component: SecretHeroesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'secret-detail/:id',
    component: SecretHeroDetailComponent,
    canActivate: [AuthGuard]
  },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [DashboardComponent, HeroesComponent, HeroDetailComponent, SecretHeroesComponent, SecretHeroDetailComponent, LoginComponent];
