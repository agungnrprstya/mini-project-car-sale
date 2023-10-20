import { React } from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import Dashboard from "../pages/Dashboard";
import DetailProduct from "../pages/DetailProduct";
import EditProduct from "../pages/EditProduct";
import LandingPage from "../pages/LandingPage";
import ListTransaction from "../pages/ListTransaction";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductPage from "../pages/ProductPage";

function RouteManagement() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/list-transaction" element={<ListTransaction />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteManagement;
