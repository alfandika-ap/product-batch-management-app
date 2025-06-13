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
import { Calendar, Package, AlertTriangle, RefreshCw } from "lucide-react";

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
      <Card className="w-full mx-auto border-red-200 bg-gradient-to-br from-red-50 to-red-100/50">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Error Icon with Animation */}
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center ring-4 ring-red-50 animate-pulse">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>

            {/* Error Title */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-red-900">
                Serial Number Invalid
              </h3>
              <p className="text-red-700 text-base max-w-md mx-auto leading-relaxed">
                We couldn't find a product with this serial number. The code
                might be incorrect or the product hasn't been registered yet.
              </p>
            </div>

            {/* Error Details Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto border border-red-200/50 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-red-600" />
                <p className="text-sm font-semibold text-red-800">
                  Common Issues:
                </p>
              </div>
              <ul className="text-sm text-red-700 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Serial number entered incorrectly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>QR code is damaged or unreadable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Product not yet registered in system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Temporary server connection issue</span>
                </li>
              </ul>
            </div>

            {/* Action Suggestions */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-red-800">
                <RefreshCw className="h-4 w-4" />
                <p className="text-sm font-medium">
                  Double-check the serial number and try scanning again
                </p>
              </div>

              {/* Help Text */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-xs text-amber-800 font-medium">
                  💡 Need Help?
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Make sure you're scanning the official Carabao product QR code
                  and the lighting is adequate for a clear scan.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
