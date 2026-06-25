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

  loadAllStock(): void {
    // We do the one-time subscription here in the service
    console.log('Fetching stock data from API...');
    this.http.get<StockItem[]>(this.apiURL).subscribe({
      next: (data) => {
        // alert('Stock data loaded successfully!');

        this.stockItem.update(() => data);
      },
      error: (err) => console.error('Error fetching stock', err),
    });
  }

  addStock(): void {
    this.http.post<AddStock>(this.apiURL, this.AddStockItem()).subscribe({
      next: (data) => {
        alert('Stock added successfully!');
        this.loadAllStock(); // again show the fupdated stock table after adding new stock
        this.resetAddStockItem();
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
      .patch(`${this.apiURL}/dispatch`, this.RemoveStockItem(), { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert('Stock successfully dispatched!');
          this.loadAllStock();

          this.RemoveStockItem.set({ itemId: 0, quantity: 0 });
        },
        error: (err) => {
          console.error('Error dispatching stock', err);
          // alert(err.error || 'Failed to dispatch stock.');
        },
      });
  }

  async restockItem(payload: RestockPayload): Promise<void> {
    await firstValueFrom(this.http.post(this.apiURL, payload));
    this.loadAllStock(); // Refresh the stock list after restocking}
  }
}
