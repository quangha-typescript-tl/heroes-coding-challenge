import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmoursComponent } from './armours.component';

describe('ArmoursComponent', () => {
  let component: ArmoursComponent;
  let fixture: ComponentFixture<ArmoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
