import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard-component';
import { InventoryManagementComponent } from './features/inventory-management/inventory-management-component';
import { TransactionsComponent } from './features/transactions/transactions';

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
        path : "transactions",
        component:TransactionsComponent
    }
];
