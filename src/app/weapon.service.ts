import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import {Weapon} from './weapon';
import {WEAPONS} from './mock-weapon';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    const heroes = of(WEAPONS);
    this.messageService.add('WeaponService: fetched heroes');
    return heroes;
  }

  getWeapon(id: number): Observable<Weapon> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const weapon = WEAPONS.find(w => w.id === id)!;
    this.messageService.add(`WeaponService: fetched hero id=${id}`);
    return of(weapon);
  }
}
