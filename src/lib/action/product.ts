"use server";

import { Order } from "../api/orders";
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
    streetAddress: string;
  };
  paymentMethod: string;
}

export interface PlaceOrderResponse {
  success: boolean;
  data: {
    orderNumber: string;
  };
  message?: string;
}

export interface UpdateStatusResponse {
  success: boolean;
  data: Order;
  message: string;
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

//update order status
export const updateOrderStatus = async (
  orderId: string,
  status: string,
): Promise<UpdateStatusResponse> => {
  return serverMutation(
    `/ordered-product/${orderId}/status`,
    { status },
    "PATCH",
  );
};
