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
}
