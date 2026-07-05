export interface OrderResult {
  productTitle: string;
  pin?: string;
  serial?: string;
  cardNumber?: string;
  total: number;
}

export interface FormData {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  buildingNo: string;
  notes: string;
  paymentMethod: "cod" | "wallet";
}
