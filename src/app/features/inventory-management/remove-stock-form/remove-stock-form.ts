import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Stock } from '../../../services/stock';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-remove-stock-form',
  imports: [ReactiveFormsModule],
  templateUrl: './remove-stock-form.html',
  styleUrl: './remove-stock-form.css',
})
export class RemoveStockForm implements OnInit {
  dispatchForm = new FormGroup({
    itemId: new FormControl(0, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  private itemIdSub?: Subscription;

  public _stockService = inject(Stock);

  ngOnDestroy(): void {
    this.itemIdSub?.unsubscribe();
  }
  ngOnInit(): void {
    console.log('in init firet');
    this._stockService.loadAllStock();
    this.itemIdSub = this.dispatchForm.get('itemId')?.valueChanges.subscribe((selectedId) => {
      this.applyMaxQuantityValidator(Number(selectedId));
    });
  }
  applyMaxQuantityValidator(itemId: number): void {
    const qtyControl = this.dispatchForm.get('quantity');
    const selectedItem = this._stockService.stockItem().find((item) => item.itemId === itemId);

    if (selectedItem) {
      qtyControl?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(selectedItem.quantity),
      ]);
    } else {
      qtyControl?.setValidators([Validators.required, Validators.min(1)]);
    }

    qtyControl?.updateValueAndValidity();
  }
  async RemoveStock(): Promise<void> {
    if (this.dispatchForm.invalid) {
      alert('Please select an item and enter a valid quantity.');
      return;
    }

    const formValues = this.dispatchForm.value;

    this._stockService.RemoveStockItem.set({
      itemId: Number(formValues.itemId),
      quantity: Number(formValues.quantity),
    });

    try {
      await this._stockService.dispatchStock();
      this.dispatchForm.reset({ itemId: 0, quantity: 0 });
    } catch {
      alert('Failed to dispatch stock.');
    }
  }
}
