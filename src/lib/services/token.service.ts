import Cookies from "js-cookie";

const TOKEN_KEY = "carabao-product-management-token";

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  return token;
};

export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token);

export const removeToken = () => Cookies.remove(TOKEN_KEY);