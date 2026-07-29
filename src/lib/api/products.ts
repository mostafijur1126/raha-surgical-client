import { serverFetch } from "../core/server";

export const getProducts = () => {
  return serverFetch("/products");
};
