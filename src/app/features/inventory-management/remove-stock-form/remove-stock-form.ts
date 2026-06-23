import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stock } from '../../../services/stock';

@Component({
  selector: 'app-remove-stock-form',
  imports: [FormsModule],
  templateUrl: './remove-stock-form.html',
  styleUrl: './remove-stock-form.css',
})
export class RemoveStockForm {

  constructor(public _stockService: Stock ){}

  ngOnInit():void {
    console.log('StockTable component initialized');
    this._stockService.loadAllStock();
  }
  RemoveStock() : void {
    const itemId = this._stockService.RemoveStockItem().itemId;
    console.log('Dispatching stock for item ID:', itemId);

    if(itemId === 0) {
      alert('Please select an item to dispatch.');
      return;
    }
    this._stockService.dispatchStock();
  }

  onItemChange(itemId: number) : void {
    console.log('Selected Item ID:', itemId);
    this._stockService.RemoveStockItem.update(s => ({...s, itemId: itemId}));
  }
}
