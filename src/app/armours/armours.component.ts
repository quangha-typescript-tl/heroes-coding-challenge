import { Component, OnInit } from '@angular/core';
import {Armour} from '../armour';
import {ArmourService} from '../armour.service';

@Component({
  selector: 'app-armours',
  templateUrl: './armours.component.html',
  styleUrls: ['./armours.component.css']
})
export class ArmoursComponent implements OnInit {
  armours: Armour[] = [];

  constructor(private armourService: ArmourService) { }

  ngOnInit() {
    this.getArmours();
  }

  getArmours(): void {
    this.armourService.getAmours()
      .subscribe(armours => this.armours = armours);
  }
}
