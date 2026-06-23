import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../services/category';
import { Vendor } from '../../../services/vendor';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddStock } from '../../../models/add-stock';
import { InventoryManagementComponent } from '../inventory-management-component';
import { Stock } from '../../../services/stock';

@Component({
  selector: 'app-add-stock-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-stock-form.html',
  styleUrl: './add-stock-form.css',
})
export class AddStockForm implements OnInit {
  constructor(
    public _categories: Category,
    public _vendor: Vendor,
    public _inventory: InventoryManagementComponent,
  ) {}

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

    // this.addStockForm.get('categoryName')?.valueChanges.subscribe((selectedCategory) => {
    //   this.addStockForm.get('vendorName')?.setValue('', { emitEvent: false }); // Reset vendor selection when category changes
    //   if (selectedCategory) {
    //     console.log('Category selected:', selectedCategory);
    //     this._vendor.onCategoryChange(selectedCategory);

    //     // 3. This triggers your service, updates the Signal, and populates your HTML!
    //   }
    // });
  }

  onSubmit(): void {
    if (this.addStockForm.valid) {
      const formPayload = this.addStockForm.value;

      this.stockService.AddStockItem.set({
        itemName: formPayload.itemName ?? '',
        CategoryName: formPayload.categoryName ?? '',
        VendorName: formPayload.vendorName ?? '',
        quantity: formPayload.quantity ?? 0,
        threshold: formPayload.threshold ?? 0,
      });

      this.stockService.addStock();

      this.resetForm();
    } else {
      alert('Please fill out all required fields correctly.');
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
