import ProductsDetailCard from "@/modules/products/products-detail-card";
import ProductsDetailTableBatches from "@/modules/products/products-detail-table-batches";
import { useParams } from "react-router";

function ProductDetailPage() {
  const { productId } = useParams();
  return (
    <div className="flex gap-4">
      <div className="w-1/4">
        <ProductsDetailCard id={productId!} />
      </div>
      <div className="w-3/4">
        <ProductsDetailTableBatches productId={productId!} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
