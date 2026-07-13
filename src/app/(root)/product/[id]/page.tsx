import { getProductByIdAction } from "@/actions/saas.actions";
import ProductClient from "./product-client";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductByIdAction(id);

  if (!product) {
    return <div className="p-10 text-center text-sm text-gray-500">Продукт не найден</div>;
  }

  return <ProductClient product={product} />;
}
