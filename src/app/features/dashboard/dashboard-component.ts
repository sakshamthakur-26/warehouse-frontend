import { Component, OnInit } from '@angular/core';
import { StockTable } from './stock-table/stock-table';
import { LowStockAlert } from './low-stock-alert/low-stock-alert';
import { Stock } from '../../services/stock';
import { Dashboard } from '../../services/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [StockTable, LowStockAlert],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService: Dashboard, private router: Router,) {}


  ngOnInit(): void {
    this.dashboardService.loadDashboardMetrics();
  }

   goToZones(): void {
    this.router.navigate(['/zones']);
  }

  goToVendors(): void {
    this.router.navigate(['/vendors']);
  }
}
