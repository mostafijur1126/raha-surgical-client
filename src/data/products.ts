export interface Product {
  id: string;
  brand: string;
  name: string;
  rating: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  image: string;
  category: string;
}

// TODO: Replace this demo product array with backend API response.
// Example:
// const { data } = useGetFeaturedProductsQuery();
export const featuredProducts: Product[] = [
  {
    id: "1",
    brand: "PrecisionMed",
    name: "Micro-Surgical Forceps",
    rating: 4.9,
    price: 249.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Ophthalmology",
  },
  {
    id: "2",
    brand: "SurgiCore",
    name: 'Titanium Hemostat 5"',
    rating: 4.8,
    price: 89.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "General Surgery",
  },
  {
    id: "3",
    brand: "EndoLink",
    name: "Laparoscopic Dissector",
    rating: 5.0,
    price: 1120.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Minimally Invasive",
  },
  {
    id: "4",
    brand: "Stryker-Compact",
    name: "Orthopedic Bone Saw",
    rating: 4.7,
    price: 3450.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Orthopedics",
  },
  {
    id: "5",
    brand: "ValveTech",
    name: "Cardiovascular Scissor",
    rating: 4.9,
    price: 415.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Cardiac",
  },
  {
    id: "6",
    brand: "SurgiCore",
    name: "Needle Holder TC-Gold",
    rating: 4.8,
    price: 125.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Suturing",
  },
  {
    id: "7",
    brand: "SkinPro",
    name: "Dermatology Curette",
    rating: 4.6,
    price: 65.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Dermatology",
  },
  {
    id: "8",
    brand: "NeuroGear",
    name: "Neurosurgery Retractor",
    rating: 5.0,
    price: 2890.0,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=80",
    category: "Neurology",
  },
];
