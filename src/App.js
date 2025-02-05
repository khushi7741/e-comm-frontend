import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartApp from "./pages/CartApp";
import { Cloudinary } from "@cloudinary/url-gen";
import ProductDetail from "./pages/ProductDetail";
import CartDetail from "./pages/CartDetail";
import Checkout from "./pages/Checkout";
import RazorpayPayment from "./pages/RazorpayPayment";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import AdminLogin from "./pages/AdminLogin";
import AdminSignUp from "./pages/AdminSignUp";
import StoreLogin from "./pages/StoreLogin";
import StoreSignUp from "./pages/StoreSignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import Dashboard from "./pages/admin/Dashboard";
import ListProduct from "./pages/admin/ListProduct";
import StoreLayout from "./pages/store/StoreLayout";
import Categories from "./pages/store/Categories";
import AddCategory from "./pages/store/AddCategory";
import StoreAddProduct from "./pages/store/StoreAddProduct";
import StoreListProduct from "./pages/store/StoreListProduct";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminAddCategory from "./pages/admin/AdminAddCategory";

function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "drsh8sn1x",
    },
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/store-login" element={<StoreLogin />} />
        <Route path="/store-signup" element={<StoreSignUp />} />
        <Route path="/cart-app" element={<CartApp />} />
        <Route
          path="/store/categories"
          element={
            <StoreLayout>
              <Categories />
            </StoreLayout>
          }
        />
        <Route
          path="/store/add-product"
          element={
            <StoreLayout>
              <StoreAddProduct />
            </StoreLayout>
          }
        />
        <Route
          path="/store/list-product"
          element={
            <StoreLayout>
              <StoreListProduct />
            </StoreLayout>
          }
        />
        <Route
          path="/store/add-category"
          element={
            <StoreLayout>
              <AddCategory />
            </StoreLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboard>
              <Dashboard />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/list-product"
          element={
            <AdminDashboard>
              <ListProduct />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminDashboard>
              <AddProduct />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminDashboard>
              <AdminCategories />
            </AdminDashboard>
          }
        />
        <Route
          path="/admin/add-category"
          element={
            <AdminDashboard>
              <AdminAddCategory />
            </AdminDashboard>
          }
        />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/cart-detail" element={<CartDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/razorpay-payment" element={<RazorpayPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
