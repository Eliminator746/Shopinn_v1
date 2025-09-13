import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PrivateRoutes from "./components/PrivateRotues";
import OrderScreen from "./screens/Admin/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderList from "./screens/OrderList";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProductList from "./screens/Admin/ProductScreen";
import UserListScreen from "./screens/Admin/UserListScreen"

export default function App() {
  return (
    <PayPalScriptProvider deferLoading={true}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/page/:pageNumber/search/:keyword" element={<HomeScreen />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            <Route path="/admin" element={<AdminRoute />}>
              <Route path="/admin/orderlist" element={<OrderList />} />
              <Route path="/admin/productlist" element={<ProductList />} />
              <Route path="/admin/productlist/:pageNumber" element={<ProductList />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}