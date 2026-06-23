import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZone } from './add-zone';



describe('AddZone', () => {
  let component: AddZone;
  let fixture: ComponentFixture<AddZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddZone ],
    }).compileComponents();
    

    fixture = TestBed.createComponent(AddZone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  


});
