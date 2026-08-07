import { serverFetch } from "../core/server";
import { Product } from "../types";

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}
// export interface CategoryOption {
//   slug: string;
//   count: number;
// }

export interface GetCategoriesResponse {
  success: boolean;
  data: string[];
  message?: string;
}

export interface GetProductByIdResponse {
  success: boolean;
  data: Product;
  message?: string;
}

export interface PopularCategory {
  category: string;
  imageUrl: string | null;
  productCount: number;
}

export const getProducts = (
  category?: string | null,
): Promise<GetProductsResponse> => {
  if (category) {
    return serverFetch(`/products?category=${encodeURIComponent(category)}`);
  }
  return serverFetch("/products");
};

export const getProductById = (id: string): Promise<GetProductByIdResponse> => {
  return serverFetch(`/products/${id}`);
};

export const getCategories = (): Promise<GetCategoriesResponse> => {
  return serverFetch("/categories");
};

export const getPopularCategories = (): Promise<{
  success: boolean;
  data: PopularCategory[];
}> => {
  return serverFetch("/api/categories/popular");
};

export const getFeaturedProducts = (): Promise<GetProductsResponse> => {
  return serverFetch("/featured-products");
};
