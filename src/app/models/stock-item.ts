import { NonNullableFormBuilder } from "@angular/forms";

export interface StockItem {
    itemId:number,
    name:string,
    category:string,
    zone:string,
    quantity:number,
    status?:string
}
