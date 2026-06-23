import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit {

  // ✅ MAIN DATA
  allTransactions: any[] = [];
  filteredData: any[] = [];

  // ✅ FILTERS
  searchId: string = '';
  searchItem: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedType: string = '';
  selectedVendor: string = '';

  // ✅ VENDORS
  vendors: any[] = [];

  // ✅ POPUP
  showHistoryPopup: boolean = false;
  historyData: any[] = [];
  selectedItemId: number | null = null;

  constructor(private api: ApiService, private router: Router) {}

  goToDashboard() {
  this.router.navigate(['/dashboard']); 
}
  // ✅ INIT
  ngOnInit() {
    this.loadAll();

    this.api.getVendors().subscribe((data: any) => {
      this.vendors = data?.data || data;
    });
  }

  // ✅ LOAD ALL DATA
  loadAll() {
    this.api.getTransactions().subscribe((data: any) => {
      const txns = data?.data || data || [];
      this.allTransactions = txns;
      this.applyAllFilters();
    });
  }

  // ✅ MAIN COMBINED FILTER FUNCTION 🔥
  applyAllFilters() {

    let data = [...this.allTransactions];

    // ✅ Vendor
    if (this.selectedVendor) {
      data = data.filter(t =>
        Number(t.vendorId) === Number(this.selectedVendor)
      );
    }

    // ✅ Type
    if (this.selectedType) {
      data = data.filter(t => t.type === this.selectedType);
    }

    // ✅ Transaction ID
    if (this.searchId) {
      data = data.filter(t =>
        t.transactionId.toString().includes(this.searchId)
      );
    }

    // ✅ Item ID
    if (this.searchItem) {
      data = data.filter(t =>
        t.itemId.toString().includes(this.searchItem)
      );
    }

    // ✅ Date
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      data = data.filter(t => {
        const d = new Date(t.timestamp);
        return d >= start && d <= end;
      });
    }

    // ✅ FINAL RESULT
    this.filteredData = data;

    console.log("✅ Filtered:", this.filteredData);
  }

  // ✅ TYPE BUTTON
  filterType(type: string) {
    this.selectedType = type;
    this.applyAllFilters();
  }

  // ✅ ITEM HISTORY POPUP
  viewItemHistory(itemId: number) {

    this.api.getItemHistory(itemId)
      .subscribe((data: any) => {

        const newData = data?.data || data || [];

        this.historyData = newData;
        this.selectedItemId = itemId;
        this.showHistoryPopup = true;
      });
  }

  // ✅ CLOSE POPUP
  closePopup() {
    this.showHistoryPopup = false;
  }

  // ✅ DASHBOARD COUNTS
  getInboundCount() {
    return this.filteredData.filter(t => t.type === 'Inbound').length;
  }

  getOutboundCount() {
    return this.filteredData.filter(t => t.type === 'Outbound').length;
  }
}
