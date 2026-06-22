import { Component, OnInit } from '@angular/core';
import { Vendor } from '../models/vendor';
import { VendorService } from '../../core/services/vendor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vendor-form.html',
  styleUrls: ['./vendor-form.css']
})
export class VendorForm implements OnInit {

  vendor: Vendor = {
    name: '',
    email: '',
    phoneNumber: '',
    goodsSupplied: '',
    isActive: true
  };

  isEdit = false;
  errorMsg: string = '';

  constructor(
    private service: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isEdit = true;

      this.service.getById(id).subscribe({
        next: (data) => this.vendor = data,
        error: (err) => {
          this.errorMsg = 'Failed to load vendor';
          console.error(err);
        }
      });
    }
  }

  save() {

    this.errorMsg = '';

    // ✅ FRONTEND VALIDATION

    if (!this.vendor.name || this.vendor.name.trim().length < 2) {
      this.errorMsg = 'Name must be at least 2 characters';
      return;
    }

    if (!this.vendor.email || !this.vendor.email.includes('@')) {
      this.errorMsg = 'Enter a valid email';
      return;
    }

    if (!/^\d{10}$/.test(this.vendor.phoneNumber)) {
      this.errorMsg = 'Phone number must be exactly 10 digits';
      return;
    }

    if (!this.vendor.goodsSupplied) {
      this.errorMsg = 'Goods supplied is required';
      return;
    }

    // ✅ API CALL

    if (this.isEdit) {

      this.service.update(this.vendor.vendorId!, this.vendor)
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => {
            this.errorMsg = err?.error?.message || 'Update failed';
          }
        });

    } else {

      this.service.create(this.vendor)
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => {
            this.errorMsg = err?.error?.message || 'Create failed';
          }
        });
    }
  }
}
