import { Component } from '@angular/core';
import { Category } from '../../../services/category';
import { Vendor } from '../../../services/vendor';
import { FormsModule } from '@angular/forms';
import { AddStock } from '../../../models/add-stock';
import { InventoryManagementComponent } from '../inventory-management-component';

@Component({
  selector: 'app-add-stock-form',
  imports: [FormsModule],
  templateUrl: './add-stock-form.html',
  styleUrl: './add-stock-form.css',
})
export class AddStockForm {

  constructor(public _categories:Category,public _vendor:Vendor,public _inventory:InventoryManagementComponent){}


  // stock: AddStock = {
  //     itemName:'',
  //     category:'',
  //     vendor:'',
  //     quantity:0,
  //     threshold:0
  // }
  

  //load categories name
  ngOnInit():void {
    this._categories.loadAllCategories();
  }

// filter vendor name based on categories
  async onCategoryChange(selectedCategory:string) {
    await this._vendor.onCategoryChange(selectedCategory);
  }

  addStock() : void  {
      this._inventory._stockService.addStock();
  }


  
  
}
