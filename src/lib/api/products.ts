import { serverFetch } from "../core/server";
import { Product } from "../types";

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

export const getProducts = (
  category?: string | null,
): Promise<GetProductsResponse> => {
  if (category) {
    return serverFetch(`/products?category=${encodeURIComponent(category)}`);
  }
  return serverFetch("/products");
};

export interface GetProductByIdResponse {
  success: boolean;
  data: Product;
  message?: string;
}

export const getProductById = (id: string): Promise<GetProductByIdResponse> => {
  return serverFetch(`/products/${id}`);
};

export const getCategories = (): Promise<{
  success: boolean;
  data: string[];
  message?: string;
}> => {
  return serverFetch("/categories");
};

export const getFeaturedProducts = (): Promise<{
  success: boolean;
  data: Product[];
  message?: string;
}> => {
  return serverFetch("/featured-products");
};
