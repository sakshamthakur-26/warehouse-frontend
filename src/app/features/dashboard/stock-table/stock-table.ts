import { Component } from '@angular/core';
import { Stock } from '../../../services/stock';
import { FormsModule } from '@angular/forms';
// import { Stock } from '../../../services/stock';

@Component({
  selector: 'app-stock-table',
  imports: [],
  templateUrl: './stock-table.html',
  styleUrl: './stock-table.css',
})
export class StockTable {

  constructor(public _stockService:Stock) {

  }

  ngOnInit():void {
    console.log('StockTable component initialized');
    this._stockService.loadAllStock();
  }

}
