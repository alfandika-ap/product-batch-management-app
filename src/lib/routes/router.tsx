import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ProductDetailPage from "@/pages/dashboard/product-detail/page";
import BatchDetailPage from "@/pages/dashboard/product-detail/batch-detail/page";
import ScanPage from "@/pages/scan";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        ),
      },
      {
        path: "/products/:productId",
        element: (
          <DashboardLayout>
            <ProductDetailPage />
          </DashboardLayout>
        ),
      },
      {
        path: "/products/:productId/batches/:batchId",
        element: (
          <DashboardLayout>
            <BatchDetailPage />
          </DashboardLayout>
        ),
      },
      // Add more protected routes here
    ],
  },
  {
    path: "/scan",
    element: <ScanPage />,
  },
]);
