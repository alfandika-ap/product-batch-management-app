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
import type { BatchProductItem } from "@/types/batch.types";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import ButtonDownloadBatches from "./components/button-download-batches";
import ModalQrDetail from "./components/modal-qr-detail";
import { useGetBatchProductItems } from "./hooks/use-batch";

function ProductsDetailTableBatchProductItems({
  batchId,
}: {
  batchId: string;
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
      key: "itemOrder",
      header: "Order",
      cell: (batch) => (
        <span className="inline-flex items-center rounded-md border bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold capitalize">
          {batch.itemOrder}
        </span>
      ),
    },
    {
      key: "qrCode",
      header: "QR Code",
      className: "w-32 h-32",
      cell: (batch) => (
        <div className="truncate" title={batch.qrCode}>
          <ModalQrDetail
            trigger={
              <img
                src={batch.qrCode}
                alt="QR Code"
                className="w-20 h-20 cursor-pointer"
              />
            }
            qrCode={batch.qrCode}
          />
        </div>
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
          <ButtonDownloadBatches />
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
