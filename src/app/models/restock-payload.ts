export interface RestockPayload {
  itemName: string;
  categoryName: string;
  quantity: number;
  vendorName: string;
  threshold?: number | null;
}
