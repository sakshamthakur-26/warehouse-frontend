import { Component } from '@angular/core';
import { StockTable } from './stock-table/stock-table';
import { LowStockAlert } from './low-stock-alert/low-stock-alert';
import { Stock } from '../../services/stock';

@Component({
  selector: 'app-dashboard-component',
  imports: [StockTable,LowStockAlert],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

  constructor(public _stockService:Stock) {

  }

  // onInit():void {
  //   this._stockService.loadAllStock();
  // }

}
