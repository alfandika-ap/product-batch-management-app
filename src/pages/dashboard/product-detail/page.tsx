import ProductsDetailCard from "@/modules/products/products-detail-card";
import ProductsDetailTableBatches from "@/modules/products/products-detail-table-batches";
import { useParams } from "react-router";

function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div className="flex gap-4">
      <div className="w-1/4">
        <ProductsDetailCard id={id!} />
      </div>
      <div className="w-3/4">
        <ProductsDetailTableBatches productId={Number(id)} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
