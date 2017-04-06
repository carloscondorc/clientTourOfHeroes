"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
//declare var Auth0Lock: any;
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        // lock = new Auth0Lock('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN');
        this.authUrl = 'http://localhost:9966/api/auth/login';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' });
        /*  this.lock.on('authenticated', (authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);
      
            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
              if (error) {
                console.log(error);
              }
      
              localStorage.setItem('profile', JSON.stringify(profile));
            });
      
            this.lock.hide();
          });*/
    }
    AuthService.prototype.login = function (username, password) {
        return this.http.post(this.authUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                //  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                localStorage.setItem('id_token', token);
                console.log('SE LOGEO TRUEEEE');
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        }).catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AuthService.prototype.logout = function () {
        // To log out, just remove the token and profile
        // from local storage
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        // Send the user back to the dashboard after logout
        this.router.navigateByUrl('/dashboard');
    };
    AuthService.prototype.loggedIn = function () {
        return false; //tokenNotExpired();
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map