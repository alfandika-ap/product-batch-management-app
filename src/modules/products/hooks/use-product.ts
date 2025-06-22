import api from "@/lib/api/axios";
import { API_PRODUCT_ROUTES } from "@/lib/constant";
import type { CreateProductRequest, Product, ProductsResponse } from "@/types/product.types";
import type { RequestResponse } from "@/types/request.types";
import { useMutation, useQuery } from "@tanstack/react-query";

type UseGetProductsProps = {
  params: {
    page?: number;
    limit?: number;
  };
};

export const useGetProducts = ({ params }: UseGetProductsProps) => {
  return useQuery({
    queryKey: ["products", params.page, params.limit],
    queryFn: () =>
      api.get<RequestResponse<ProductsResponse>>(
        API_PRODUCT_ROUTES.GET_PRODUCTS,
        {
          params: {
            page: params.page,
            limit: params.limit,
          },
        }
      ),
  });
};

export const useGetProduct = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      api.get<RequestResponse<Product>>(
        API_PRODUCT_ROUTES.GET_PRODUCT.replace(":id", id)
      ),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: CreateProductRequest) => api.post(API_PRODUCT_ROUTES.CREATE_PRODUCT, data)
  });
};