import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateCategoryPayload } from '../models/create-category-payload';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Category {

  private apiURL = `${environment.apiURL}/api/Categories`;
  public CategoriesName:WritableSignal<Array<string>> = signal<Array<string>>([]);

   public _filteredVendorName :WritableSignal<Array<string>> = signal<Array<string>>([]);

  constructor(public http:HttpClient) {

  }

  loadAllCategories() : void {
    console.log("categories name start fetching");

    this.http.get<Array<string>>(this.apiURL).subscribe({
      next : (data)=> {
      
        this.CategoriesName.update(()=>data)
        // alert("categories fetched successfully")
      },
      error : (err)=> {
        console.error("Error fetching categories",err)
      }
    });


  }

  async createCategory(payload: CreateCategoryPayload): Promise<void> {
    await firstValueFrom(
      this.http.post(this.apiURL, payload)
    );
  }

   

}
