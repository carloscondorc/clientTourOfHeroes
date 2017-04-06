import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

//declare var Auth0Lock: any;

@Injectable()
export class AuthService {

 // lock = new Auth0Lock('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN');
 private authUrl = 'http://localhost:9966/api/auth/login';
 private headers = new Headers({'Content-Type': 'application/json', 
                                  'X-Requested-With': 'XMLHttpRequest'});

  constructor(private http: Http, private router: Router) {
  /* this.lock.on('authenticated', (authResult: any) => {
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

  login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                  //  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                   localStorage.setItem('id_token', token);
                   
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error:any) => Observable.throw(error.json().message || 'Server error'));
    }
  

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/dashboard');
  }

  loggedIn() {
    return tokenNotExpired();
  }
} 