import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { API_BATCH_ROUTES } from "@/lib/constant";
import type { BatchesResponse, BatchProductItemsResponse } from "@/types/batch.types";
import type { RequestResponse } from "@/types/request.types";

export type UseGetBatchsProps = {
  params: {
    productId: number;
    page?: number;
    limit?: number;
  };
};

export const useGetProductBatches = ({ params }: UseGetBatchsProps) => {
  return useQuery({
    queryKey: ["batches", params.productId, params.page, params.limit],
    queryFn: () => api.get<RequestResponse<BatchesResponse>>(API_BATCH_ROUTES.GET_BATCHES, {
      params: {
        productId: params.productId,
        page: params.page,
        limit: params.limit,
      },
    }),
  });
};


export const useGetBatchProductItems = (params: { batchId : number, page?: number, limit?: number }) => {
  return useQuery({
    queryKey: ["batch-product-items", params.batchId, params.page, params.limit],
    queryFn: () => api.get<RequestResponse<BatchProductItemsResponse>>(API_BATCH_ROUTES.GET_BATCH_PRODUCT_ITEMS.replace(":id", params.batchId.toString()), {
      params: {
        page: params.page,
        limit: params.limit,
      },
    }),
  });
};