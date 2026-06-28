"import { useEffect } from \"react\";
import \"@/App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import { Toaster } from \"@/components/ui/sonner\";
import { CartProvider } from \"@/context/CartContext\";
import { AuthProvider } from \"@/context/AuthContext\";
import Home from \"@/pages/Home\";
import Products from \"@/pages/Products\";
import Checkout from \"@/pages/Checkout\";
import AdminLogin from \"@/pages/AdminLogin\";
import AdminDashboard from \"@/pages/AdminDashboard\";
import RequireAdmin from \"@/components/RequireAdmin\";

function App() {
  return (
    <div className=\"App\">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path=\"/\" element={<Home />} />
              <Route path=\"/products\" element={<Products />} />
              <Route path=\"/checkout\" element={<Checkout />} />
              <Route path=\"/admin/login\" element={<AdminLogin />} />
              <Route
                path=\"/admin\"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
            </Routes>
          </BrowserRouter>
          <Toaster richColors position=\"top-right\" />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
"