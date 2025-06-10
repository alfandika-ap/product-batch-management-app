import { useMutation } from "@tanstack/react-query";
import { API_AUTH_ROUTES } from "@/lib/constant";
import api from "@/lib/api/axios";
import type { LoginRequest, LoginResponse } from "@/types/auth.types";
import type { RequestResponse } from "@/types/request.types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => api.post<RequestResponse<LoginResponse>>(API_AUTH_ROUTES.LOGIN, data)
  });
};