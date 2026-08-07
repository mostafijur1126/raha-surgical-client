import { serverFetch } from "../core/server";
export interface Order {
  _id: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    streetAddress: string;
    district: string;
    postcode?: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
    sku: string;
    unitType: string;
  };
  quantity: number;
  unitPrice: number;
  subtotal: number;
  paymentMethod: string;
  orderNotes?: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface GetOrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  message?: string;
}

export const getOrders = async (params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<GetOrdersResponse> => {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.status) query.append("status", params.status);
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));

  const url = `/ordered-product${query.toString() ? `?${query.toString()}` : ""}`;
  return serverFetch(url);
};
