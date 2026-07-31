export interface PricingTier {
  unitType: string;
  unitsPerPackage: number;
  price: string;
  sku: string;
}

export interface Product {
  _id: string;
  productName: string;
  brand: string;
  category: string;
  baseSku: string;
  stockLevel: number;
  rxRequired: boolean;
  description: string;
  imageUrls: string[];
  pricingTiers: PricingTier[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

export interface PricingTier {
  price: string;
  sku: string;
  unitType: string;
  unitsPerPackage: number;
}
