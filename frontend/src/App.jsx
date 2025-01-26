import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="product/:productId" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}