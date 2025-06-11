import { useQuery } from "@tanstack/react-query";
import { API_PRODUCT_ROUTES } from "@/lib/constant";
import api from "@/lib/api/axios";
import type { Product, ProductsResponse } from "@/types/product.types";
import type { RequestResponse } from "@/types/request.types";

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
