import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import { ListOfProducts } from "./ProductList";
import HomePage from "./HomePage";
import NoPage from "./NoPage";
import Product from "./Product";
import FilterProductPage from "./FilterProductsPage";
import Cart from "./Cart";

export const pageContext = createContext([]);

function App() {
  const [productsList, setProductsList] = useState(ListOfProducts);
  const [cartList, setCartList] = useState([]);
  const[cartListTotal, setCartListTotal] = useState(0)
  // console.log("Cart Item ", cartList);

  return (
    <pageContext.Provider value={{ productsList, cartList, setCartList, cartListTotal, setCartListTotal }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:productCategory" element={<FilterProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </pageContext.Provider>
  );
}

export default App;
