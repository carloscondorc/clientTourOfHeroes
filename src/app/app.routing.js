"use strict";
var router_1 = require('@angular/router');
var auth_guard_service_1 = require('./auth-guard.service');
var dashboard_component_1 = require('./dashboard.component');
var heroes_component_1 = require('./heroes.component');
var hero_detail_component_1 = require('./hero-detail.component');
var login_component_1 = require('./login.component');
var secret_heroes_component_1 = require('./secret-heroes.component');
var secret_hero_detail_component_1 = require('./secret-hero-detail.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
    },
    {
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'secret-heroes',
        component: secret_heroes_component_1.SecretHeroesComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'secret-detail/:id',
        component: secret_hero_detail_component_1.SecretHeroDetailComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [dashboard_component_1.DashboardComponent, heroes_component_1.HeroesComponent, hero_detail_component_1.HeroDetailComponent, secret_heroes_component_1.SecretHeroesComponent, secret_hero_detail_component_1.SecretHeroDetailComponent, login_component_1.LoginComponent];
//# sourceMappingURL=app.routing.js.map