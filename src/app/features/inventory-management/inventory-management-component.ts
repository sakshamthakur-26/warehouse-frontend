import { Component } from '@angular/core';
import { AddStockForm } from './add-stock-form/add-stock-form';
import { RemoveStockForm } from './remove-stock-form/remove-stock-form';

@Component({
  selector: 'app-inventory-management-component',
  imports: [AddStockForm,RemoveStockForm],
  templateUrl: './inventory-management-component.html',
  styleUrl: './inventory-management-component.css',
})
export class InventoryManagementComponent {}
