"use server";

import { serverMutation } from "../core/server";

export const addProduct = async (productData) => {
  return serverMutation("/add-product", productData);
};
