import type { Pagination } from "./request.types";

export type Batch = {
  id: string;
  productId: string;
  batchCode: string;
  quantity: number;
  createdAt: string;
  generateProductItemsStatus: "pending" | "completed" | "failed";
};

export type BatchProductItem = {
  id: string;
  batchId: number;
  qrCode: string;
  serialNumber: string;
  status: string;
  firstScanAt: string | null;
  itemOrder: number;
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

export interface CreateBatchRequest {
  product_id: string;
  batch_code: string;
  quantity: number;
}

export interface BatchProgressResponse {
  total: number;
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  totalInsert: number;
  qty: number;
  progressPercentage: number;
  isCompleted: boolean;
}

export interface DownloadBatchZipResponse {
  downloadUrl: string;
  expiresIn: string;
  instructions: string;
}