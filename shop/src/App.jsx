import "./App.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
  const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY
  
  const supabase = createClient(
    supabaseUrl,supabaseKey
  );

  
  const [productsList, setProductsList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0)
  const [searchItem, setSearchItem]= useState("")

  const [userList, setUserList] = useState(UserList)
  const [isLogged, setIsLogged] = useState(false)// loggedId
  const [user, setUser] = useState(null)

  

  // useEffect(()=>{
  //   const loggedUserID = localStorage.getItem('user')
  //   const loggedUser = userList.find((e)=> e.id == parseInt(loggedUserID))

  //   if(loggedUser === undefined){
  //     setLoggedId(-1)
  //   }else{
  //     setLoggedId(loggedUser)
  //   }
  //   // console.log("Obecnie zalogowany",loggedID)
  //   // console.log("localstoarge",loggedUser)

  // },[loggedID])

  // const getSession = async () => {
  //   const { data, error } = await supabase.auth.getSession();
  
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(data.session.access_token); // Tutaj znajdziesz informacje o sesji
  //   }
  // };

  // useEffect(()=>{
  //   const token = localStorage.getItem('userToken');
  //   if(token){
  //     supabase.auth.setSession({access_token: getSession()})
  //   }
  // },[])

  // console.log("User: ",user)
  
  
  // getSession();

  const fetchProductsData = async () => {
    const { data, error } = await supabase
      .from('ValufiProducts')
      .select('*')

    if (error) {
      console.error(error);
    } else {
      setProductsList(data);
      // const [productsList, setProductsList] = useState(data);
      return data
      // console.log(data)
    }
  };
    
  useEffect(()=>{
    fetchProductsData();
    
  },[])
  // console.log("list APP ", productsList)


  return (
    <pageContext.Provider value={{ productsList, cartList, setCartList, cartListTotal, setCartListTotal, searchItem, setSearchItem, isLogged, setIsLogged, userList, setUserList,user, setUser, supabase, fetchProductsData }}>
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
