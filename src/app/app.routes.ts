import { Routes } from "@angular/router";
import { Login } from "./features/login/login/login";
import { Register } from "./features/register/register/register";
import { authGuard } from "./guards/auth-guard";
import { DashboardComponent } from "./features/dashboard/dashboard-component";
import { InventoryManagementComponent } from "./features/inventory-management/inventory-management-component";
import { AddZone } from "./features/add-zone/add-zone/add-zone";

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  
{
  path: '',
  canActivate: [authGuard],
  children: [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventory-management', component: InventoryManagementComponent },
    { path: 'zones', component: AddZone }
  ]
}
,

  { path: '**', redirectTo: 'dashboard' }
];
