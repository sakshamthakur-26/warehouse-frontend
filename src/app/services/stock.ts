import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { StockItem } from '../models/stock-item';
import { AddStock } from '../models/add-stock';
import { RemoveStock } from '../models/remove-stock';
import { RestockPayload } from '../models/restock-payload';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Stock {
  private apiURL = `${environment.apiURL}/api/StockItems`;

  public stockItem: WritableSignal<StockItem[]> = signal<StockItem[]>([]);

  public AddStockItem = signal<AddStock>({
    itemName: '',
    CategoryName: '',
    VendorName: '',
    quantity: 0,
    threshold: 0,
  });

  public RemoveStockItem = signal<RemoveStock>({
    itemId: 0,
    quantity: 0,
  });

  constructor(private http: HttpClient) {}

  //For load Stock Table

  async loadAllStock(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<StockItem[]>(this.apiURL));
      this.stockItem.set(data);
    } catch (err) {
      console.error('Error fetching stock', err);
      throw err; // let caller (component) decide how to show this to the user
    }
  }

  addStock(): void {
    this.http.post<AddStock>(this.apiURL, this.addStock).subscribe({
      next: (data) => {
        alert('Stock added successfully!');
        this.loadAllStock(); // again show the fupdated stock table after adding new stock
        // this.resetAddStockItem();
      },
      error: (err) => console.error('Error adding stock', err),
    });
  }

  resetAddStockItem() {
    this.AddStockItem.set({
      itemName: '',
      CategoryName: '',
      VendorName: '',
      quantity: 0,
      threshold: 0,
    });
  }

  dispatchStock(): void {
    this.http
      .patch(`${this.apiURL}/dispatch`, this.restockItem, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert('Stock successfully dispatched!');
          this.loadAllStock();
        },
        error: (err) => {
          console.error('Error dispatching stock', err);
        },
      });
  }

  restockItem(payload: RestockPayload): void {
    this.http.post(this.apiURL, payload).subscribe({
      next: () => {
        alert('Stock restocked successfully!');
        this.loadAllStock();
      },
      error: (err) => console.error('Error restocking', err),
    });
  }
}
