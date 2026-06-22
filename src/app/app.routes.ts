import { Routes } from '@angular/router';
import { VendorList } from './vendors/vendor-list/vendor-list';
import { VendorForm } from './vendors/vendor-form/vendor-form';

export const routes: Routes = [
  { path: '', component: VendorList },
  { path: 'add', component: VendorForm },
  { path: 'edit/:id', component: VendorForm }
];
``