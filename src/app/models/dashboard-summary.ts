import { LowStockItem } from "./low-stock-item";

export interface DashboardSummary {
  totalZones: number;
  totalLowStockAlerts: number;
  totalActiveVendors: number;
  totalStockItems: number;
  lowStockItems: LowStockItem[];
}
