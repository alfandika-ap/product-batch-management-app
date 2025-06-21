export const API_AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
}

export const API_PRODUCT_ROUTES = {
  GET_PRODUCTS: "/products",
  GET_PRODUCT: "/products/:id",
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: "/products/:id",
  DELETE_PRODUCT: "/products/:id",
}

export const API_BATCH_ROUTES = {
  GET_BATCHES: "/batches",
  GET_BATCH: "/batches/:id",
  GET_BATCH_PRODUCT_ITEMS: "/batches/:id/product-items",
  CREATE_BATCH: "/batches",
  UPDATE_BATCH: "/batches/:id",
  DELETE_BATCH: "/batches/:id",
  GET_BATCH_PROGRESS: "/batches/:id/progress",
  DOWNLOAD_BATCH_ZIP: "/batches/:id/download",
}

export const API_PRODUCT_SCAN_ROUTES = {
  POST_PRODUCT_SCAN: "/scan/"
}