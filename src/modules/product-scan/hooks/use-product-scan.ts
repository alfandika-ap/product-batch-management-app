import { useMutation } from "@tanstack/react-query";
import { API_PRODUCT_SCAN_ROUTES } from "@/lib/constant";
import api from "@/lib/api/axios";
import type { ProductScanRequest, ProductScanResponse } from "@/types/product-scan.type";
import type { RequestResponse } from "@/types/request.types";

export const useProductScan = () => {
  return useMutation({
    mutationFn: (data: ProductScanRequest) => api.post<RequestResponse<ProductScanResponse>>(API_PRODUCT_SCAN_ROUTES.POST_PRODUCT_SCAN, data),
  });
};