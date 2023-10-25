import { React } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./admin-route";
import CustomerRoute from "./customer-route";
import ProtectedRoute from "./protected-route";
import AddProduct from "../pages/AddProduct";
import Dashboard from "../pages/Dashboard";
import DetailProduct from "../pages/DetailProduct";
import EditProduct from "../pages/EditProduct";
import LandingPage from "../pages/LandingPage";
import ListTransaction from "../pages/ListTransaction";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import ProductPage from "../pages/ProductPage";
import SignUpPage from "../pages/SignUpPage";

function RouteManagement() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<ProtectedRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/" element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/list-transaction" element={<ListTransaction />} />
      </Route>
      <Route path="/" element={<CustomerRoute />}>
        <Route path="/product/:id" element={<DetailProduct />} />
      </Route>
      <Route path="/product" element={<ProductPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteManagement;
