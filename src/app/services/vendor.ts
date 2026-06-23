import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Vendor {

    private apiURL = `${environment.apiURL}/api/Vendors`;
     public _filteredVendorName :WritableSignal<Array<string>> = signal<Array<string>>([]);

  constructor(public http:HttpClient) {

  }

  //For load VendorName by Categories

  onCategoryChange(SelectedCategory:string): void {

    console.log('Selected Category:', SelectedCategory); // Debug log to check the selected category

    this.http.get<Array<string>>(`${this.apiURL}/category/${SelectedCategory}`).subscribe({

      next: (data)=> {
        console.log(data);
        this._filteredVendorName.set(data)
        console.log(this._filteredVendorName());
      },
      error: (err) => {
        console.error("Error fetching VendorName",err);
      }
    });

  }
}
