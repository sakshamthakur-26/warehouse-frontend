import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStockForm } from './remove-stock-form';

describe('RemoveStockForm', () => {
  let component: RemoveStockForm;
  let fixture: ComponentFixture<RemoveStockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveStockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveStockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
