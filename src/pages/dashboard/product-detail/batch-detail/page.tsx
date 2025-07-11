import ProductsDetailTableBatchProductItems from "@/modules/products/products-detail-table-batch-product-items";
import { useParams } from "react-router";

function BatchDetailPage() {
  const { batchId } = useParams();
  return <ProductsDetailTableBatchProductItems batchId={batchId!} />;
}

export default BatchDetailPage;
