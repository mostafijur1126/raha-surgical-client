import { getProductById } from "@/lib/api/products";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

const productDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;

  const response = await getProductById(id);
  const data = response.data;
  console.log(data);
  return <div>Product ID: {id}</div>;
};

export default productDetailsPage;
