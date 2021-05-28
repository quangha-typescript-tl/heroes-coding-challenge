import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import {Armour} from "./armour";
import {ARMOURS} from "./mock-armours";

@Injectable({ providedIn: 'root' })
export class ArmourService {

  constructor(private messageService: MessageService) { }

  getAmours(): Observable<Armour[]> {
    const armours = of(ARMOURS);
    this.messageService.add('ArmourService: fetched armours');
    return armours;
  }

  getAmour(id: number): Observable<Armour> {
    const armour = ARMOURS.find(a => a.id === id)!;
    this.messageService.add(`ArmourService: fetched armour id=${id}`);
    return of(armour);
  }
}
