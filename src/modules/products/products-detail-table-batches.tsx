import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import type { Batch } from "@/types/batch.types";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ButtonModalCreateBatch from "./components/button-modal-create-batch";
import { useGetProductBatches } from "./hooks/use-batch";
import { useGetProduct } from "./hooks/use-product";

function ProductsDetailTableBatches({ productId }: { productId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: product } = useGetProduct({ id: productId.toString() });

  const { data, isLoading, error } = useGetProductBatches({
    params: {
      productId,
      page: currentPage,
      limit: pageSize,
    },
  });

  const columns: ColumnDef<Batch>[] = [
    {
      key: "id",
      header: "No",
      cell: (batch: Batch) => {
        const index = batches.findIndex((p) => p.id === batch.id);
        const rowNumber = (currentPage - 1) * pageSize + index + 1;
        return <p>{rowNumber}</p>;
      },
    },
    {
      key: "batchCode",
      header: "Batch Code",
      className: "min-w-[200px]",
      cell: (batch) => (
        <Link to={`/products/${productId}/batches/${batch.id}`}>
          {batch.batchCode}
        </Link>
      ),
    },
    {
      key: "generateProductItemsStatus",
      header: "Status",
      cell: (product) => (
        <span className="inline-flex items-center rounded-md border bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold capitalize">
          {product.generateProductItemsStatus}
        </span>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      className: "max-w-[300px]",
      cell: (product) => (
        <div className="truncate" title={product.quantity.toString()}>
          {product.quantity}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      cell: (product) => (
        <span className="text-sm text-muted-foreground">
          {new Date(product.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading products: {error.message}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const batches = data?.data?.data.batches || [];
  const pagination = data?.data?.data.pagination;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Batches</CardTitle>
        <CardDescription>
          View and manage batches for{" "}
          <span className="font-bold">{product?.data?.data.name}</span>
        </CardDescription>
        <CardAction>
          <ButtonModalCreateBatch />
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          data={batches}
          columns={columns}
          isLoading={isLoading}
          pagination={
            pagination
              ? {
                  currentPage: pagination.currentPage,
                  totalPages: pagination.totalPages,
                  onPageChange: handlePageChange,
                }
              : undefined
          }
          emptyMessage="No batches found. Start by adding some batches."
        />
      </CardContent>
    </Card>
  );
}

export default ProductsDetailTableBatches;
