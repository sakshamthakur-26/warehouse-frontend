import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../features/vendors/models/vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiURL = `${environment.apiURL}/api/Vendors`;
  public _filteredVendorName: WritableSignal<Array<string>> = signal<Array<string>>([]);

  constructor(public http: HttpClient) {}

  //For load VendorName by Categories
  onCategoryChange(SelectedCategory: string): void {
    console.log('Selected Category:', SelectedCategory);

    this.http.get<Array<string>>(`${this.apiURL}/category/${SelectedCategory}`).subscribe({
      next: (data: Array<string>) => {
        this._filteredVendorName.set(data);
        console.log(this._filteredVendorName());
      },
      error: (err: any) => {
        console.error('Error fetching VendorName', err);
      },
    });
  }

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiURL);
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiURL}/${id}`);
  }

  create(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiURL, vendor);
  }

  update(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiURL}/${id}`, vendor);
  }
}
