import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import * as $ from 'jquery';
import Konva from 'konva';
import {Armour} from '../armour';
import {ArmourService} from '../armour.service';
import {Weapon} from '../weapon';
import {WeaponService} from '../weapon.service';
import {Subscription, timer} from 'rxjs';

const PADDING = 50;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private defaultImages = ['/assets/thor.jpeg', '/assets/ironman.jpeg'];
  private battle!: Subscription;
  heroes: Hero[] = [];
  weapons: Weapon[] = [];
  selectedHeroesList: any[] = [];
  defaultStateConfig = {
    container: 'container',
    width: 800,
    height: 800
  };
  configStage!: any;
  layer = new Konva.Layer();
  weaponChooseHidden = true;
  weaponChangeId = 0;
  heroChangeId = 0;

  constructor(private heroService: HeroService,
              private elementRef: ElementRef,
              private armourService: ArmourService,
              private weaponService: WeaponService) {
  }

  private _unsubscribe(subscription: any) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }

  ngOnInit() {
    this.getHeroes();
    this.getWeapons();
  }

  battleStart() {
    // decrease health every second
    this._unsubscribe(this.battle);
    this.battle = timer (1000, 1000).subscribe(b => {
      for (let i = 0; i < this.selectedHeroesList.length; i++) {
        for (let j = 0; j < this.selectedHeroesList.length; j++) {
          if (i !== j) {
            this.selectedHeroesList[i].health = this.selectedHeroesList[i].health - this.selectedHeroesList[j].damage;
          }
        }
        // remove hero when your health
        if (this.selectedHeroesList[i].health <= 0) {
          this.selectedHeroesList[i].konvaImg.remove();
          this.selectedHeroesList.splice(i, 1);
        } else {
          if (this.selectedHeroesList[i].health < 50) {
            this.selectedHeroesList[i].konvaImg.setAttrs({stroke: 'red', strokeWidth: 10});
          }
        }
      }
      // clear battle when only one hero is alive
      if (this.selectedHeroesList.length < 2) {
        this._unsubscribe(this.battle);
      }
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 4));
    this.heroes.forEach(hero => {
      hero.health = hero.health + this.getHealthArmour(hero.armourId);
      hero.damage = this.getDamageWeapon(hero.weaponId);
    });
  }

  getHealthArmour(armourId: number): number {
    let armour: Armour | any;
    let healthArmour = 0;
    this.armourService.getAmour(armourId)
      .subscribe(armour => healthArmour = armour.health);
    return healthArmour;
  }

  getDamageWeapon(weaponId: number): number {
    let weapon: Weapon | any;
    let damageWeapon = 0;
    this.weaponService.getWeapon(weaponId)
      .subscribe(weapon => damageWeapon = weapon.damage);
    return damageWeapon;
  }

  ngAfterViewInit() {
    const menuElement = this.elementRef.nativeElement.querySelector('.heroes-menu');
    if (menuElement) {
      this.defaultStateConfig.width = $(menuElement).width()! + PADDING * 2;
    }
    this.defaultStateConfig.height = this.defaultStateConfig.height + PADDING * 2;
    this.configStage = new Konva.Stage(this.defaultStateConfig);
    this.configStage.add(this.layer);
  }

  // add hero to canvas
  drawImage(hero: Hero, imageObj: any) {
    const heroImg = new Konva.Image({
      image: imageObj,
      x: hero.id * 100 + 100,
      y: hero.id * 100 + 150,
      width: 100,
      height: 100,
      draggable: true
    });
    this.selectedHeroesList.push({id: hero.id, konvaImg: heroImg, health: hero.health, damage: hero.damage});
    heroImg.on('click', () => {
      this.weaponChooseHidden = false;
      this.weaponChangeId = hero.weaponId;
      this.heroChangeId = hero.id;
    });
    this.layer.add(heroImg);
    if (this.selectedHeroesList.length > 1) {
      this.battleStart();
    }
  }

  onClickHero(hero: Hero) {
    const index = this.selectedHeroesList.findIndex(h => h.id === hero.id);
    if (index > -1) {
      this.selectedHeroesList[index].konvaImg.remove();
      this.selectedHeroesList.splice(index, 1);
    } else {
      const imageObj = new Image();
      imageObj.onload = () => {
        this.drawImage(hero, imageObj);
      };
      imageObj.src = hero.imageSrc ? hero.imageSrc : this.getDefaultImg();
    }
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe( weapons => this. weapons = weapons);
  }

  getDefaultImg() {
    return this.defaultImages[Math.floor(Math.random() * (this.defaultImages.length - 1))];
  }

  changeWeapon(weaponId: any) {
    const index = this.selectedHeroesList.findIndex(h => h.id === this.heroChangeId);
    if (index > -1) {
      this.selectedHeroesList[index].damage = this.getDamageWeapon(Number(weaponId));
    }
  }

  ngOnDestroy() {
    this._unsubscribe(this.battle);
  }
}
