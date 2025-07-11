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
import type { Product } from "@/types/product.types";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ButtonModalCreateProduct from "./components/button-modal-create-product";
import { useGetProducts } from "./hooks/use-product";

function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, error } = useGetProducts({
    params: {
      page: currentPage,
      limit: pageSize,
    },
  });

  const columns: ColumnDef<Product>[] = [
    {
      key: "id",
      header: "No",
      cell: (product: Product) => {
        const index = products.findIndex((p) => p.id === product.id);
        const rowNumber = (currentPage - 1) * pageSize + index + 1;
        return <p>{rowNumber}</p>;
      },
    },
    {
      key: "name",
      header: "Product Name",
      className: "min-w-[200px]",
      cell: (product) => (
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (product) => (
        <span className="inline-flex items-center rounded-md border bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold capitalize">
          {product.category}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "max-w-[300px]",
      cell: (product) => (
        <div className="truncate" title={product.description}>
          {product.description}
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

  const products = data?.data?.data.products || [];
  const pagination = data?.data?.data.pagination;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products Management</CardTitle>
        <CardDescription>Manage your products here.</CardDescription>
        <CardAction>
          <ButtonModalCreateProduct />
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          data={products}
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
          emptyMessage="No products found. Start by adding some products."
        />
      </CardContent>
    </Card>
  );
}

export default ProductsTable;
