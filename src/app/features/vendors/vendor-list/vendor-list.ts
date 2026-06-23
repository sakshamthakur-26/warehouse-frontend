import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Vendor } from '../models/vendor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../../../core/services/vendor';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vendor-list.html',
  styleUrls: ['./vendor-list.css']
})
export class VendorList implements OnInit {

  vendors: Vendor[] = [];
  getNextVendorId(): string {
  return 'VEN' + (this.vendors.length + 1).toString().padStart(3, '0');
}
  searchText: string = '';
  showModal = false;

  // Holds the vendor being created or edited
  newVendor: Vendor = {
    name: '',
    email: '',
    phoneNumber: '',
    goodsSupplied: '',
    isActive: true
  };

  // we're editing an existing vendor (has vendorId)
  editMode: boolean = false;
  // Form-level and field-level error messages returned from backend
  formError: string = '';
  fieldErrors: { email?: string; phoneNumber?: string } = {};

  constructor(private service: VendorService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.service.getAll().subscribe(data => {
      this.vendors = data;
      try { this.cdr.detectChanges(); } catch (e) {}
    });
  }

  get activeCount(): number {
    return this.vendors.filter(v => v.isActive).length;
  }

  get totalCount(): number {
    return this.vendors.length;
  }

  filteredVendors(): Vendor[] {
    if (!this.searchText) return this.vendors;

    const q = this.searchText.toLowerCase();

    return this.vendors.filter(v => {
      const idMatch = v.vendorId !== undefined && v.vendorId !== null && v.vendorId.toString().includes(q);
      const nameMatch = v.name && v.name.toLowerCase().includes(q);
      const emailMatch = v.email && v.email.toLowerCase().includes(q);
      return idMatch || nameMatch || emailMatch;
    });
  }

  openModal() {
    this.resetModal();
    try { document.body.style.overflow = 'hidden'; } catch(e) {}
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    try { document.body.style.overflow = ''; } catch(e) {}
  }

  addVendor() {
    this.formError = '';
    this.fieldErrors = {};
    if (!this.localValidate()) return;

    // Create new vendor
    this.service.create(this.newVendor).subscribe(() => {
      this.closeModal();
      this.loadVendors();
    }, err => {
      const payload = err?.error;
      this.handleServerError(payload);
    });
  }

  openEditModal(v: Vendor) {
    this.editMode = true;
    this.newVendor = { ...v };
    this.showModal = true;
  }

  saveVendor() {
    if (this.editMode && this.newVendor.vendorId) {
      this.formError = '';
      this.fieldErrors = {};
      if (!this.localValidate()) return;

      this.service.update(this.newVendor.vendorId, this.newVendor).subscribe(() => {
        this.closeModal();
        this.editMode = false;
        this.loadVendors();
      }, err => {
        const payload = err?.error;
        this.handleServerError(payload);
      });
    } else {
      this.addVendor();
    }
  }

  resetModal() {
    this.editMode = false;
    this.newVendor = {
      name: '',
      email: '',
      phoneNumber: '',
      goodsSupplied: '',
      isActive: true
    };
    this.formError = '';
    this.fieldErrors = {};
  }

  private handleServerError(payload: any) {
    // payload expected shape: { ErrorCode: string, Message: string } or { message: '...' }
    const msg = payload?.Message || payload?.message || payload?.error || 'Server error';
    this.formError = msg;

    const lc = (msg || '').toLowerCase();
    if (lc.includes('email') && !lc.includes('phone')) {
      this.fieldErrors.email = msg;
    } else if (lc.includes('phone') && !lc.includes('email')) {
      this.fieldErrors.phoneNumber = msg;
    } else {
      this.formError = msg;
    }
  }

 
  private localValidate(): boolean {
    const errs: { email?: string; phoneNumber?: string } = {};

    // Basic format checks
    const email = (this.newVendor.email || '').trim();
    if (!email || !email.includes('@')) {
      errs.email = 'Invalid email address. It must contain an \"@\" character.';
    }

    const phone = (this.newVendor.phoneNumber || '').trim();
    if (!/^[0-9]{10}$/.test(phone)) {
      errs.phoneNumber = 'Phone number must contain exactly 10 digits.';
    }

    // Duplication checks against loaded vendors
    const qEmail = email.toLowerCase();
    const qPhone = phone;
    const duplicateEmail = this.vendors.some(v => v.email && v.email.toLowerCase() === qEmail &&
      (this.editMode ? v.vendorId !== this.newVendor.vendorId : true));
    const duplicatePhone = this.vendors.some(v => v.phoneNumber && v.phoneNumber === qPhone &&
      (this.editMode ? v.vendorId !== this.newVendor.vendorId : true));

    if (duplicateEmail) errs.email = 'A vendor with the same email already exists.';
    if (duplicatePhone) errs.phoneNumber = 'A vendor with the same phone number already exists.';

    this.fieldErrors = errs;
    // If any field error exists, do not proceed
    return Object.keys(errs).length === 0;
  }
}