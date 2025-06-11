import { useGetProduct } from "./hooks/use-product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Calendar, Package } from "lucide-react";

function ProductsDetailCard({ id }: { id: string }) {
  const { data, isLoading, error } = useGetProduct({ id });

  if (isLoading) {
    return (
      <Card className="w-full mx-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-2xl mx-auto">
        <Package className="h-4 w-4" />
        <div>
          <h4 className="font-semibold">Error loading product</h4>
          <p className="text-sm">{error.message}</p>
        </div>
      </Alert>
    );
  }

  const product = data?.data?.data;

  if (!product) {
    return (
      <Alert className="w-full mx-auto">
        <Package className="h-4 w-4" />
        <div>
          <h4 className="font-semibold">Product not found</h4>
          <p className="text-sm">The requested product could not be found.</p>
        </div>
      </Alert>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full mx-auto overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-2xl font-bold leading-tight">
              {product.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-medium">
                {product.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Product Image */}
        {product.imageUrl ? (
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
            <div className="text-center text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No image available</p>
            </div>
          </div>
        )}

        {/* Product Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold ">Description</h3>
          <CardDescription className="text-base leading-relaxed">
            {product.description}
          </CardDescription>
        </div>

        {/* Product Info */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Created on {formatDate(product.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductsDetailCard;
