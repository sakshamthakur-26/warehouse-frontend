import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RemoveStockForm } from './features/inventory-management/remove-stock-form/remove-stock-form';
import { AddStockForm } from './features/inventory-management/add-stock-form/add-stock-form';
import { DashboardComponent } from './features/dashboard/dashboard-component';
import { Sidebar } from './features/sidebar/sidebar';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RemoveStockForm, AddStockForm,DashboardComponent,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WareHouse_Inventory_System');
}
