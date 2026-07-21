import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

import Home from "@/pages/Home.jsx";
import Products from "@/pages/Products.jsx";
import Checkout from "@/pages/Checkout.jsx";
import AdminLogin from "@/pages/AdminLogin.jsx";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import RequireAdmin from "@/components/RequireAdmin.jsx";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import RefundPolicy from "@/pages/RefundPolicy";
import ShippingPolicy from "@/pages/ShippingPolicy";
import MyOrders from "@/pages/MyOrders";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />

              <Route
                path="/admin/products/new"
                element={
                  <RequireAdmin>
                    <AddProduct />
                  </RequireAdmin>
                }
              />

              <Route
                path="/admin/products/edit/:id"
                element={
                  <RequireAdmin>
                    <EditProduct />
                  </RequireAdmin>
                }
              />
            </Routes>
            <WhatsAppFloat />
          </BrowserRouter>
          <Toaster richColors position="top-right" />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
