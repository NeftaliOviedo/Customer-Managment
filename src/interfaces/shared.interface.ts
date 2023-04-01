export interface Customer {
    id:number;
    customerName: string;
    customerLastName: string;
    phone: string;
    addresses: CustomerAddress[];
}

export interface CustomerAddress {
    id:number;
    street:string;
    city:string;
    state:string;
}