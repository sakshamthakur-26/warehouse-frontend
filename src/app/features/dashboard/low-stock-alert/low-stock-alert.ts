import { Component } from '@angular/core';
import { Dashboard } from '../../../services/dashboard';

@Component({
  selector: 'app-low-stock-alert',
  imports: [],
  templateUrl: './low-stock-alert.html',
  styleUrl: './low-stock-alert.css',
})
export class LowStockAlert {
  constructor(public dashboardService: Dashboard) {}
}
