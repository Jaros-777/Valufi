import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import { ListOfProducts } from "./ProductList";
import { UserList } from "./UserList";
import HomePage from "./HomePage";
import NoPage from "./NoPage";
import Product from "./Product";
import FilterProductPage from "./FilterProductsPage";
import Cart from "./Cart";
import Login from "./Profile/Login";

export const pageContext = createContext([]);

function App() {
  const [productsList, setProductsList] = useState(ListOfProducts);
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0)
  const [searchItem, setSearchItem]= useState("")

  const [userList, setUserList] = useState(UserList)
  const [loggedID, setLoggedId] = useState(-1)


  // const user = UserList.map((u)=> u.id === loggedID)[0]
  // console.log(user)
  // const userIndex = UserList.findIndex((u)=> u.id === loggedID)
  // console.log(UserList[userIndex].name)



  return (
    <pageContext.Provider value={{ productsList, cartList, setCartList, cartListTotal, setCartListTotal, searchItem, setSearchItem,loggedID,userList }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:productCategory" element={<FilterProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </pageContext.Provider>
  );
}

export default App;
