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
import StoreLayout from "./pages/store/StoreLayout";
import StoreAddProduct from "./pages/store/StoreAddProduct";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminAddCategory from "./pages/admin/AdminAddCategory";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminEditCategory from "./pages/admin/AdminEditCategory";
import StoreEditCategory from "./pages/store/StoreEditCategory";
import StoreEditProduct from "./pages/store/StoreEditProduct";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import StoreAddCategory from "./pages/store/StoreAddCategory";
import StoreCategories from "./pages/store/StoreCategories";
import StoreProducts from "./pages/store/StoreListProduct";

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
              <StoreCategories />
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
              <StoreProducts />
            </StoreLayout>
          }
        />
        <Route
          path="/store/edit-product"
          element={
            <StoreLayout>
              <StoreEditProduct />
            </StoreLayout>
          }
        />
        <Route
          path="/store/add-category"
          element={
            <StoreLayout>
              <StoreAddCategory />
            </StoreLayout>
          }
        />
        <Route
          path="/store/edit-category"
          element={
            <StoreLayout>
              <StoreEditCategory />
            </StoreLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/list-product"
          element={
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminLayout>
              <AdminAddProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/edit-product"
          element={
            <AdminLayout>
              <AdminEditProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-category"
          element={
            <AdminLayout>
              <AdminAddCategory />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/edit-category"
          element={
            <AdminLayout>
              <AdminEditCategory />
            </AdminLayout>
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
