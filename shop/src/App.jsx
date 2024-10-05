import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import { ListOfProducts } from "./ProductList";
import HomePage from "./HomePage";

export const pageContext = createContext([]);

function App() {
  const [productsList, setProductsList] = useState(ListOfProducts);
  const [cartList, setCartList] = useState([]);
  console.log("Cart Item ", cartList);

  return (
    <pageContext.Provider value={{ productsList, cartList, setCartList }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path="blogs" element={<Blogs />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </pageContext.Provider>
  );
}

export default App;
