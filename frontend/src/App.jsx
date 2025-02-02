import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}