import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import * as $ from 'jquery';
import Konva from 'konva';
import { Armour } from '../armour';
import { ArmourService } from '../armour.service';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

const PADDING = 50;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  heroes: Hero[] = [];
  selectedHeroesList: any[] = [];
  defaultStateConfig = {
    container: 'container',
    width: 800,
    height: 800
  };
  configStage!: any;
  layer = new Konva.Layer();
  private defaultImages = ['/assets/thor.jpeg', '/assets/ironman.jpeg'];
  battle: any;

  constructor(private heroService: HeroService,
    private elementRef: ElementRef,
    private armourService: ArmourService,
    private weaponService: WeaponService) { }

  ngOnInit() {
    this.getHeroes();
    this.battleStart();
    this.battle = setInterval(() => {
      this.battleStart();
  }, 1000);
  }

  battleStart() {
    for(let i = 0; i < this.selectedHeroesList.length; i++) {
      for(let j = 0; j < this.selectedHeroesList.length; j++) {
        if (i !== j) {
          this.selectedHeroesList[i].health = this.selectedHeroesList[i].health - this.selectedHeroesList[j].damage;
        }
        if (this.selectedHeroesList[i].health <= 0) {
          this.selectedHeroesList[i].konvaGroup.remove();
          this.selectedHeroesList.splice(i, 1);
        } else {
          if (this.selectedHeroesList[i].health < 50) {
            this.selectedHeroesList[i].konvaImg.setAttrs({stroke: 'red', strokeWidth: 5});
          }
        }
      }
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 4));
    this.heroes.forEach(hero => {
      hero.health = hero.health + this.getHealthArmour(hero.armourId);
      hero.damage = this.getDamageWeapon(hero.weaponId);
      });
  }

  getHealthArmour(armourId: number): number{
    let armour: Armour | any;
    let healthArmour = 0;
    this.armourService.getAmour(armourId)
    .subscribe(armour => healthArmour = armour.health);
    return healthArmour;
  }

  getDamageWeapon(weaponId: number): number{
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

  drawImage(hero: Hero, imageObj: any) {
    const heroImg = new Konva.Image({
      image: imageObj,
      x: hero.id * 100,
      y: 150,
      width: 100,
      height: 100,
      draggable: true
    });
    this.selectedHeroesList.push({id: hero.id, konvaImg: hero.imageSrc, health: hero.health, damage: hero.damage});
    this.layer.add(heroImg);
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

  getDefaultImg() {
    return this.defaultImages[Math.floor(Math.random() * (this.defaultImages.length - 1))];
  }
}
