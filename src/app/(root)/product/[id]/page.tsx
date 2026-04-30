import { PRODUCTS } from "@/config/products.config";
import ProductClient from "./product-client";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = PRODUCTS.find(p => String(p.id) === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductClient product={product} />;
}