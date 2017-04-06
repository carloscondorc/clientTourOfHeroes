import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
//  private heroesUrl = 'http://localhost:3001/api/public/heroes';  // URL to public heroes
  private heroesUrl = 'http://localhost:9966/heroes';  // URL to public heroes
  private secretHeroesUrl = 'http://localhost:9966/api/secret/heroes';  // URL to private heroes

  constructor(private http: Http, private authHttp: AuthHttp) { }

  // ===== Public Hero Methods =====

  getHeroes() {
    return this.http
      .get(this.heroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero): Promise<Hero> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  // ===== Private Hero Methods =====

  // Get all secret heroes
  getSecretHeroes(): Promise<Hero[]> {
    return this.authHttp
      .get(this.secretHeroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  // Get secret hero
  getSecretHero(id: number): Promise<Hero> {
    return this.getSecretHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  // Save secret hero
  saveSecret(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.putSecret(hero);
    }
    return this.postSecret(hero);
  }

  // Delete secret hero
  deleteSecret(hero: Hero): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.secretHeroesUrl}/${hero.id}`;

    return this.authHttp
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }


  // Add new secret Hero
  private postSecret(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.authHttp
      .post(this.secretHeroesUrl, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Update existing private Hero
  private putSecret(hero: Hero): Promise<Hero> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.secretHeroesUrl}/${hero.id}`;

    return this.authHttp
      .put(url, JSON.stringify(hero), { headers: headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
