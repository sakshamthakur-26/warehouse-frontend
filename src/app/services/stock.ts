import { Injectable,Signal,signal,WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { StockItem } from '../models/stock-item';
import { AddStock } from '../models/add-stock';


@Injectable({
  providedIn: 'root',
})
export class Stock {

  private apiURL = `${environment.apiURL}/api/StockItems`;

  public stockItem:WritableSignal<StockItem[]> = signal<StockItem[]>([]);

  public AddStockItem = signal<AddStock>({
    itemName:'',
    category:'',
    vendor:'',
    quantity:0,
    threshold:0
  });
  constructor(private http: HttpClient) {

  }

 

  //For load Stock Table

  loadAllStock(): void {
    // We do the one-time subscription here in the service
    console.log('Fetching stock data from API...');
    this.http.get<StockItem[]>(this.apiURL).subscribe({
      next: (data) => {
        alert('Stock data loaded successfully!');
        
        this.stockItem.update(()=>data);
      },
      error: (err) => console.error('Error fetching stock', err)
    });
  }

  addStock() : void {

    this.http.post<AddStock>(this.apiURL,this.AddStockItem()).subscribe({
      next: (data) => {
        alert('Stock added successfully!');
        this.loadAllStock(); // again show the fupdated stock table after adding new stock
      },
      error: (err) => console.error('Error adding stock', err)
    });
  }

  resetAddStockItem() {
    this.AddStockItem.set({
      itemName:'',
      category:'',
      vendor:'',
      quantity:0,
      threshold:0
    });
  }





}
