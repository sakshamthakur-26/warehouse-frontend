import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCategory } from './assign-category';

describe('AssignCategory', () => {
  let component: AssignCategory;
  let fixture: ComponentFixture<AssignCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
