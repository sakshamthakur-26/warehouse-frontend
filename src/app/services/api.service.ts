import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5281/api';

  constructor(private http: HttpClient) {}

  //  Get all transactions
  getTransactions() {
    console.log("Fetching all transactions from API...");
    return this.http.get(`${this.baseUrl}/transactions`);
  }

  //  Item history
  getItemHistory(itemId: number) {
    return this.http.get(
      `${this.baseUrl}/transactions/item?itemId=${itemId}`
    );
  }

  //  Date range API
  getTransactionsByDateRange(start: string, end: string) {
    console.log("API call:", start, end);

    return this.http.get(
      `${this.baseUrl}/transactions/date-range?start=${start}&end=${end}`
    );
  }

  //  Vendors
  getVendors() {
    return this.http.get(`${this.baseUrl}/vendors`);
  }

  //  Vendor filter
  getTransactionsByVendorId(vendorId: number) {
    return this.http.get(
      `${this.baseUrl}/transactions/vendor?vendorId=${vendorId}`
    );
  }
}