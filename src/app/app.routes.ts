import { Routes } from "@angular/router";
import { Login } from "./features/login/login/login";
import { Register } from "./features/register/register/register";
import { authGuard } from "./guards/auth-guard";
import { DashboardComponent } from "./features/dashboard/dashboard-component";
import { InventoryManagementComponent } from "./features/inventory-management/inventory-management-component";
import { AddZone } from "./features/add-zone/add-zone/add-zone";
import { TransactionsComponent } from "./features/transactions/transactions";
import { VendorList } from "./features/vendors/vendor-list/vendor-list";
import { VendorForm } from "./features/vendors/vendor-form/vendor-form";

export const routes: Routes = [

//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   { path: 'login', component: Login },
//   { path: 'register', component: Register },

  
// {
//   path: '',
//   canActivate: [authGuard],
//   children: [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventory-management', component: InventoryManagementComponent },
    { path: 'zones', component: AddZone },
    {path:"vendors",component:VendorList},
    {path:"vendors/add",component:VendorForm},

    {path:'transactions',component:TransactionsComponent},
    { path: '**', redirectTo: 'dashboard' }
  ]
// }
// ,

// ];
