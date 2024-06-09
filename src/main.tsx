import React from "react";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./pages/Main.tsx";
import ThemeConfig from "./theme.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./view/home/Home.tsx";
import Order from "./view/order/Order.tsx";
import NotFound from "./pages/NotFound.tsx";
import Orders from "./view/orders/Orders.tsx";
import Product from "./view/product/Product.tsx";
import Setting from "./view/setting/Setting.tsx";
import Products from "./view/products/Products.tsx";

import "./index.css";
import Success from "./view/success/success.tsx";

const router = createBrowserRouter([
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        children: [
          {
            path: "products/",
            element: <Products />,
          },
          {
            path: "products/:id",
            element: <Product />,
          },
        ],
      },
      {
        children: [
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:id",
            element: <Order />,
          },
        ],
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "success/:id",
        element: <Success />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeConfig>
        <RouterProvider router={router} />
      </ThemeConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
