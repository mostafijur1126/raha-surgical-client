import { serverFetch } from "../core/server";

export interface GetOrdersResponse {
  success: boolean;
  data: string[];
  message: string;
}

export const getOrders = (): Promise<GetOrdersResponse> => {
  return serverFetch("/ordered-product");
};
