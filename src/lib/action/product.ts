"use server";

import { serverMutation } from "../core/server";
import { Product } from "../types";

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

export interface PlaceOrderPayload {
  product: {
    id: string;
    name: string;
    image: string;
    unitType: string;
    sku: string;
  };
  quantity: number;
  unitPrice: number;
  subtotal: number;
  customer: {
    fullName: string;
    phone: string;
    email: string | null;
    streetAddress: string;
    district: string;
    postcode: string | null;
  };
  orderNotes: string | null;
  paymentMethod: "online" | "cod";
}

export interface PlaceOrderResponse {
  success: boolean;
  data: {
    orderNumber: string;
  };
  message?: string;
}

export const addProduct = async (
  productData: Omit<Product, "_id" | "createdAt" | "updatedAt" | "featured">,
) => {
  return serverMutation("/add-product", productData);
};

export const orderProduct = async (
  payload: PlaceOrderPayload,
): Promise<PlaceOrderResponse> => {
  return serverMutation("/order-product", payload, "POST");
};
