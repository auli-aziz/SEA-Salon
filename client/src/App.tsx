import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import Error from "./pages/Error.tsx";
import Services from "./pages/Services.tsx";
import Reservation, {
  loader as reservationFormLoader,
} from "./pages/Reservation.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { loader as reviewLoader } from "./components/ReviewCarousel.tsx";
import Authentication, {
  action as authAction,
} from "./pages/Authentication.tsx";
import { tokenLoader } from "./util/auth.tsx";
import { action as logoutAction } from "./pages/Logout.tsx";
import AdminDashboard, {
  action as addServiceAction,
  loader as dashboardLoader,
} from "./pages/Admin.tsx";
import CustomerDashboard, {
  loader as customerLoader,
} from "./pages/Customer.tsx";
import AdminLayout from "./pages/AdminLayout.tsx";
import AdminSettings from "./pages/AdminSettings.tsx";
import { loader as adminSettingsLoader } from "./pages/AdminSettings.tsx";
import Branches, { loader as branchLoader } from "./pages/Branches.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: reviewLoader,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        id: "customer-dashboard",
        loader: customerLoader,
        children: [
          {
            index: true,
            element: <CustomerDashboard />,
          },
        ],
      },
      {
        path: "reservation",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Reservation />,
            loader: reservationFormLoader
          },
        ],
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "auth",
        element: <Authentication />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        path: "",
        children: [
          {
            index: true,
            element: <AdminDashboard />,
            action: addServiceAction,
            loader: dashboardLoader,
          },
          {
            path: "settings",
            element: <AdminSettings />,
            loader: adminSettingsLoader,
          },
          {
            path: "branches",
            element: <Branches />,
            loader: branchLoader,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
