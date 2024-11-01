import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import { ListOfProducts } from "./ProductList";
import { UserList } from "./UserList";
import HomePage from "./HomePage";
import NoPage from "./NoPage";
import Product from "./Product";
import FilterProductPage from "./FilterProductsPage";
import Cart from "./Cart";
import Login from "./Profile/Login";
import Register from "./Profile/Register";

export const pageContext = createContext([]);

function App() {
  const [productsList, setProductsList] = useState(ListOfProducts);
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0)
  const [searchItem, setSearchItem]= useState("")

  const [userList, setUserList] = useState(UserList)
  const [loggedID, setLoggedId] = useState(-1)

  useEffect(()=>{
    const loggedUserID = localStorage.getItem('user')
    const loggedUser = userList.find((e)=> e.id == parseInt(loggedUserID))

    if(loggedUser === undefined){
      setLoggedId(-1)
    }else{
      setLoggedId(loggedUser)
    }
    // console.log("Obecnie zalogowany",loggedID)
    // console.log("localstoarge",loggedUser)

  },[loggedID])

  return (
    <pageContext.Provider value={{ productsList, cartList, setCartList, cartListTotal, setCartListTotal, searchItem, setSearchItem, loggedID, setLoggedId, userList, setUserList }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:productCategory" element={<FilterProductPage />} />
          <Route path="/category/search/:productCategory" element={<FilterProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </pageContext.Provider>
  );
}

export default App;
