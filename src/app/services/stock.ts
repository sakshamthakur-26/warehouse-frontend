import { Injectable,Signal,signal,WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { StockItem } from '../models/stock-item';


@Injectable({
  providedIn: 'root',
})
export class Stock {

  private apiURL = `${environment.apiURL}/api/StockItems`;

  public stockItem:WritableSignal<StockItem[]> = signal<StockItem[]>([]);
  constructor(private http: HttpClient) {

  }
  loadAllStock(): void {
    // We do the one-time subscription here in the service
    console.log('Fetching stock data from API...');
    this.http.get<StockItem[]>(this.apiURL).subscribe({
      next: (data) => {
        // alert('Stock data loaded successfully!');
        
        this.stockItem.update(()=>data);
      },
      error: (err) => console.error('Error fetching stock', err)
    });
  }

}
