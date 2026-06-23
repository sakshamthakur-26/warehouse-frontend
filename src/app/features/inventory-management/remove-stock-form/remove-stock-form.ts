import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Stock } from '../../../services/stock';

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

  constructor(public _stockService: Stock) {}

  ngOnInit(): void {
    console.log("in init firet");
    this._stockService.loadAllStock();
    this.dispatchForm.get('itemId')?.valueChanges.subscribe((selectedId) => {
      this.applyMaxQuantityValidator(Number(selectedId));
    });
  }
  applyMaxQuantityValidator(itemId: number): void {
    const qtyControl = this.dispatchForm.get('quantity');
    const selectedItem = this._stockService.stockItem().find((item) => item.itemId === itemId);

    if (selectedItem) {
      // Re-apply validators including the dynamic maximum allowed value
      qtyControl?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(selectedItem.quantity), // Sets max dynamically to available stock
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
    console.log('Dispatching stock for item ID:', formValues.itemId);

    this._stockService.RemoveStockItem.set({
      itemId: Number(formValues.itemId),
      quantity: Number(formValues.quantity),
    });

    await this._stockService.dispatchStock();
    this._stockService.loadAllStock(); // Refresh the stock list after dispatching
    this.dispatchForm.reset({ itemId: 0, quantity: 0 });
  }
}
