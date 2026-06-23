import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard-component';
import { InventoryManagementComponent } from './features/inventory-management/inventory-management-component';
import { VendorForm } from './features/vendors/vendor-form/vendor-form';
import { VendorList } from './features/vendors/vendor-list/vendor-list';

export const routes: Routes = [
    {
        path:"dashboard",
        component:DashboardComponent
    },
    {
        path:"inventory-management",
        component:InventoryManagementComponent
    },
    {

        path: "vendors",
        component: VendorList
    },
    {
        path: "vendors/add",
        component: VendorForm
    }

];
