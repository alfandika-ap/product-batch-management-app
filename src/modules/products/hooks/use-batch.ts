import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { API_BATCH_ROUTES } from "@/lib/constant";
import type { BatchesResponse, BatchProductItemsResponse, BatchProgressResponse, CreateBatchRequest, DownloadBatchZipResponse } from "@/types/batch.types";
import type { RequestResponse } from "@/types/request.types";
import { toast } from "sonner";
import axios from "axios";

export type UseGetBatchsProps = {
  params: {
    productId: string;
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

export const useGetBatchProductItems = (params: { batchId : string, page?: number, limit?: number }) => {
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

export const useCreateBatch = () => {
  return useMutation({
    mutationFn: (data: CreateBatchRequest) => api.post(API_BATCH_ROUTES.CREATE_BATCH, data),
  });
};

export const useGetBatchProgress = (params: { batchId: string }) => {
  return useQuery({
    queryKey: ["batch-progress", params.batchId],
    queryFn: () => api.get<RequestResponse<BatchProgressResponse>>(API_BATCH_ROUTES.GET_BATCH_PROGRESS.replace(":id", params.batchId.toString())),
    refetchInterval: 10000,
  });
};

export const useDownloadBatchZip = (params: { batchId: string }) => {
  return useMutation({
    mutationFn: () => api.post<RequestResponse<DownloadBatchZipResponse>>(API_BATCH_ROUTES.DOWNLOAD_BATCH_ZIP.replace(":id", params.batchId.toString())),
    onSuccess: (data, batchId) => {
      const url = data.data.data.downloadUrl;
      axios.get(url, {
        responseType: "blob",
      }).then((response) => {
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `batch-${batchId}-qrcodes.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("File berhasil didownload!");
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal download file");
    },
  });
};