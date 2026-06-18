import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard-component';
import { InventoryManagementComponent } from './features/inventory-management/inventory-management-component';

export const routes: Routes = [
    {
        path:"dashboard",
        component:DashboardComponent
    },
    {
        path:"inventory-management",
        component:InventoryManagementComponent
    }
];
