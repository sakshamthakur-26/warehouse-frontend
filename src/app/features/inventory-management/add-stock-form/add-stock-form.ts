import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../services/category';
import { VendorService } from '../../../services/vendor';
import {  
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


import { Stock } from '../../../services/stock';

@Component({
  selector: 'app-add-stock-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-stock-form.html',
  styleUrl: './add-stock-form.css',
})
export class AddStockForm implements OnInit {
  

  public _categories = inject(Category);
  public _vendor = inject(VendorService);
  public _stockService = inject(Stock);

  public stockService = inject(Stock);

  public addStockForm = new FormGroup({
    itemName: new FormControl('', Validators.required),
    categoryName: new FormControl('', Validators.required),
    vendorName: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    threshold: new FormControl(0, Validators.min(0)),
  });

  //load categories                                                                                                                                                                                                                                                                  name
  ngOnInit(): void {
    console.log('AddStockForm init initialized');
    this._categories.loadAllCategories();

    const control = this.addStockForm.get('categoryName');
    console.log('Category control:', control);
    control?.valueChanges.subscribe((selectedCategory) => {
      console.log('Category selected:', selectedCategory);
      if (selectedCategory) {
        this._vendor.onCategoryChange(selectedCategory);
      }
    });


  }

  async onSubmit():Promise<void> {
    if (this.addStockForm.valid) {
      const formPayload = this.addStockForm.value;

      this.stockService.AddStockItem.set({
        itemName: formPayload.itemName ?? '',
        CategoryName: formPayload.categoryName ?? '',
        VendorName: formPayload.vendorName ?? '',
        quantity: formPayload.quantity ?? 0,
        threshold: formPayload.threshold ?? 0,
      });

      try {

        await this.stockService.addStock();
        this.resetForm();
      }
      catch (err) {
        console.error('Error adding stock:', err);
        alert('Failed to add stock. Please try again.');
      }

    } 
  }

  resetForm(): void {
    this.addStockForm.reset({
      itemName: '',
      categoryName: '',
      vendorName: '',
      quantity: 0,
      threshold: 0,
    });

    this.stockService.resetAddStockItem();
  }
}
