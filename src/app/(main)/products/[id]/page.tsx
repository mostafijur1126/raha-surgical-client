import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import ProductDetails from "./ProductDetails";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;

  const response = await getProductById(id);

  if (!response?.success || !response.data) {
    notFound();
  }

  return <ProductDetails product={response.data} />;
};

export default ProductDetailsPage;
