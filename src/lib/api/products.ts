import { serverFetch } from "../core/server";

export const getProducts = (category?: string) => {
  if (category) {
    return serverFetch(`/products?category=${encodeURIComponent(category)}`);
  }
  return serverFetch("/products");
};

export const getProductById = (id: string) => {
  return serverFetch(`/products/${id}`);
};

export const getCategories = () => {
  return serverFetch("/categories");
};

export const getFeaturedProducts = () => {
  return serverFetch("/featured-products");
};
