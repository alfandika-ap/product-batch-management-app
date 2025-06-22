import type { Pagination } from "./request.types";

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
}

export type CreateProductRequest = Omit<Product, "id" | "createdAt">;

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}