import type { Product } from "@/lib/types";

// Single-piece (unitsPerPackage === 1) price বের করার হেল্পার।
// না পেলে প্রথম tier-এর price fallback হিসেবে ব্যবহার হবে।
export function getSinglePrice(product: Product): number {
  const singleTier =
    product.pricingTiers?.find((t) => t.unitsPerPackage === 1) ??
    product.pricingTiers?.[0];
  return singleTier ? Number(singleTier.price) : 0;
}
