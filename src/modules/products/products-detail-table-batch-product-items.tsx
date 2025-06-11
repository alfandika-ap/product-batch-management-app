import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable, type ColumnDef } from "@/components/ui/data-table";
import type { BatchProductItem } from "@/types/batch.types";
import { AlertCircle, Download } from "lucide-react";
import { useState } from "react";
import { useGetBatchProductItems } from "./hooks/use-batch";

function ProductsDetailTableBatchProductItems({
  batchId,
}: {
  batchId: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, error } = useGetBatchProductItems({
    batchId,
    page: currentPage,
    limit: pageSize,
  });

  const columns: ColumnDef<BatchProductItem>[] = [
    {
      key: "id",
      header: "ID",
      className: "w-16",
    },
    {
      key: "qrCode",
      header: "QR Code",
      className: "min-w-[200px]",
      cell: (batch) => (
        <div className="truncate" title={batch.qrCode}>
          {batch.qrCode}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (batch) => (
        <span className="inline-flex items-center rounded-md border bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold capitalize">
          {batch.status}
        </span>
      ),
    },
    {
      key: "serialNumber",
      header: "Serial Number",
      className: "max-w-[300px]",
      cell: (batch) => (
        <div className="truncate" title={batch.serialNumber}>
          {batch.serialNumber}
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

  const items = data?.data?.data.items || [];
  const pagination = data?.data?.data.pagination;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Product Items</CardTitle>
        <CardDescription>
          View and manage product items for batch{" "}
          <span className="font-bold">{batchId}</span>
        </CardDescription>
        <CardAction>
          <Button variant="outline">
            <Download />
            Download Batch QR Code
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          data={items}
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

export default ProductsDetailTableBatchProductItems;
