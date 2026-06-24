import { Component, OnInit } from '@angular/core';
import { StockTable } from './stock-table/stock-table';
import { LowStockAlert } from './low-stock-alert/low-stock-alert';
import { Stock } from '../../services/stock';
import { Dashboard } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [StockTable, LowStockAlert],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css'],
})
export class DashboardComponent implements OnInit {
  // 1. Inject the service (must be public so the HTML can read it)
  constructor(public dashboardService: Dashboard) {}

  // 2. Fetch the data as soon as the user opens the page
  ngOnInit(): void {
    this.dashboardService.loadDashboardMetrics();
  }
}
