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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var SecretHeroesComponent = (function () {
    function SecretHeroesComponent(router, heroService) {
        this.router = router;
        this.heroService = heroService;
        this.addingHero = false;
    }
    SecretHeroesComponent.prototype.getSecretHeroes = function () {
        var _this = this;
        this.heroService
            .getSecretHeroes()
            .then(function (heroes) { return _this.secretHeroes = heroes; })
            .catch(function (error) { return _this.error = error; });
    };
    SecretHeroesComponent.prototype.addSecretHero = function () {
        this.addingHero = true;
        this.selectedHero = null;
    };
    SecretHeroesComponent.prototype.close = function (savedHero) {
        this.addingHero = false;
        if (savedHero) {
            this.getSecretHeroes();
        }
    };
    SecretHeroesComponent.prototype.deleteSecretHero = function (hero, event) {
        var _this = this;
        event.stopPropagation();
        this.heroService
            .deleteSecret(hero)
            .then(function (res) {
            _this.secretHeroes = _this.secretHeroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    SecretHeroesComponent.prototype.ngOnInit = function () {
        this.getSecretHeroes();
    };
    SecretHeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    };
    SecretHeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/secret-detail', this.selectedHero.id]);
    };
    SecretHeroesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-heroes',
            templateUrl: 'secret-heroes.component.html',
            styleUrls: ['secret-heroes.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, hero_service_1.HeroService])
    ], SecretHeroesComponent);
    return SecretHeroesComponent;
}());
exports.SecretHeroesComponent = SecretHeroesComponent;
//# sourceMappingURL=secret-heroes.component.js.map