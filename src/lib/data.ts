import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Medline Precision",
    brand: "Medline",
    price: 349.0,
    rating: 4.5,
    image: "/images/product1.jpg", // Placeholder – replace with actual images
    category: "Surgical Scissors",
    inStock: true,
  },
  // ... add 11 more entries (I'll include a few, but you can generate more)
  {
    id: "2",
    name: "HealthSystems Pro",
    brand: "HealthSystems",
    price: 1299.0,
    rating: 4.2,
    image: "/images/product2.jpg",
    category: "Retractors",
    inStock: true,
  },
  {
    id: "3",
    name: "Aesculap B. Braun",
    brand: "Aesculap",
    price: 215.0,
    rating: 4.8,
    image: "/images/product3.jpg",
    category: "Forceps & Clamps",
    inStock: false,
  },
  {
    id: "4",
    name: "Precision-Suture",
    brand: "Johnson & Johnson",
    price: 4200.0,
    rating: 4.9,
    image: "/images/product4.jpg",
    category: "Suturing Tools",
    inStock: true,
  },
  // ... add rest
];
