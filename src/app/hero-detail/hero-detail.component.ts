import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Armour } from '../armour';
import { Weapon } from '../weapon';
import { ArmourService } from '../armour.service';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | any;
  armours: Armour[] = [];
  weapons: Weapon[] = [];
  healthArmour = 0;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armourService: ArmourService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getArmours();
    this.getWeapons();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    this.getHealthArmour(this.hero?.armourId);
  }

  getArmours(): void {
    this.armourService.getAmours()
      .subscribe(armours => this.armours = armours);
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe( weapons => this.weapons = weapons);
  }

  getHealthArmour(armourId: number){
    let armour: Armour | any;
    this.armourService.getAmour(armourId)
    .subscribe(armour => this.healthArmour = armour.health);
  }

  goBack(): void {
    this.location.back();
  }
}
