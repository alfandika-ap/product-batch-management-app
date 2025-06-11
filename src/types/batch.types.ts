import type { Pagination } from "./request.types";

export type Batch = {
  id: number;
  productId: number;
  batchCode: string;
  quantity: number;
  createdAt: string;
  generateProductItemsStatus: "pending" | "completed" | "failed";
};

export type BatchProductItem = {
  id: number;
  batchId: number;
  qrCode: string;
  serialNumber: string;
  status: string;
  firstScanAt: string | null;
  scanCount: number;
  createdAt: string;
}

export interface BatchesResponse {
  batches: Batch[];
  pagination: Pagination;
}

export interface BatchProductItemsResponse {
  items: BatchProductItem[];
  pagination: Pagination;
}