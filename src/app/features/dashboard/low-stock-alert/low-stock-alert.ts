import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dashboard } from '../../../services/dashboard';
import { Stock } from '../../../services/stock';
import { LowStockItem } from '../../../models/low-stock-item';

@Component({
  selector: 'app-low-stock-alert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './low-stock-alert.html',
  styleUrls: ['./low-stock-alert.css'],
})
export class LowStockAlert {
  selectedItem: LowStockItem | null = null;
  orderQuantity: number | null = null;
  orderVendor: string = '';
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    public dashboardService: Dashboard,
    private stockService: Stock,
  ) {}

  openOrderForm(item: LowStockItem, event: MouseEvent) {
    event.stopPropagation(); // don't close the hover tooltip immediately
    this.selectedItem = item;
    this.orderQuantity = null;
    this.orderVendor = item.vendorName ?? '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeOrderForm() {
    this.selectedItem = null;
  }

  async submitOrder() {
    if (
      !this.selectedItem ||
      !this.orderQuantity ||
      this.orderQuantity <= 0 ||
      !this.orderVendor.trim()
    ) {
      this.errorMessage = 'Please enter a valid quantity and vendor.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      await this.stockService.restockItem({
        itemName: this.selectedItem.itemName,
        categoryName: this.selectedItem.categoryName,
        quantity: this.orderQuantity,
        vendorName: this.orderVendor.trim(),
      });

      this.successMessage = `Order placed for ${this.orderQuantity} units of ${this.selectedItem.itemName}.`;
      this.dashboardService.loadDashboardMetrics(); // refresh counts/list

      setTimeout(() => {
        this.closeOrderForm();
        this.successMessage = '';
      }, 1500);
    } catch (err: any) {
      this.errorMessage = err?.error || 'Failed to place order. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
