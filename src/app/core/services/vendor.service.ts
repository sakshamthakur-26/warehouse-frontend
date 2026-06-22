import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../../vendors/models/vendor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

 private baseUrl = 'http://localhost:5281/api/v1/Vendors';


  constructor(private http: HttpClient) {}

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseUrl);
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/${id}`);
  }

  create(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.baseUrl, vendor);
  }

  update(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.baseUrl}/${id}`, vendor);
  }
}