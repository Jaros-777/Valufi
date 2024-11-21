import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import {supabase} from "./supabaseClient";

import HomePage from "./HomePage";
import NoPage from "./NoPage";
import Product from "./Product";
import FilterProductPage from "./FilterProductsPage";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Profile/Login";
import Register from "./Profile/Register";
import Settings from "./Profile/Settings";
import Order from "./Profile/Order";
import ChangePasswordByEmail from "./Profile/Operations/ChangePasswordByEmail";
import ForgotPassword from "./Profile/ForgotPassword";
import MyOpinions from "./Profile/Operations/MyOpinions";
import PaymentsMethod from "./Profile/Operations/PaymentsMethod";

export const pageContext = createContext([]);

function App() {
  const [productsList, setProductsList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0);
  const [userOrders, setUserOrders] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const [userList, setUserList] = useState([]);
  const [isLogged, setIsLogged] = useState(false); // loggedId
  const [user, setUser] = useState(null);

  //load products from database
  const fetchProductsData = async () => {
    const { data, error } = await supabase.from("ValufiProducts").select("*");

    if (error) {
      console.error(error);
    } else {
      setProductsList(data);
      return data;
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  //load cartList and orderList from database
  const fetchCartListData = async () => {
    const { data, error } = await supabase
      .from("ValufiUsersAccount")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      
      setCartList(data[0].cartList);
      setUser(data[0])
      if (data[0].cartList.length > 0) {
        setCartListTotal(
          data[0].cartList
            .reduce((total, value) => total + (value.count*value.price), 0)
            .toFixed(2)
        );
      }
      // order
      setUserOrders(data[0].order)
      // console.log("data Order ", data[0])
    }
  };
  
  //after refresh page data is loaded - token, logged
  useEffect(() => {

    const restoreSession = async () => {
      const session = localStorage.getItem("userToken");
      if (session) {
        const { data, error } = await supabase.auth.setSession(
          JSON.parse(session)
        );
        if (error) {
          console.error(error);
        } else {
          // setUser(data.user);
          
          setIsLogged(true);
        }
      }
    };
    restoreSession()
  }, []);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
    } else {
      return data.session;
    }
  };

  useEffect(() => {
    if (isLogged) {
      getSession().then((session) => {
        if (session) {
          localStorage.setItem("userToken", JSON.stringify(session));
          fetchCartListData()
        }
      });
    }
  }, [isLogged]);

 //after refresh? must update cartList from dataBase
  const uploadCartList = async()=>{
    try {
      const { data, error } = await supabase.from("ValufiUsersAccount")
      .update([
        {cartList: cartList}
      ])
      .eq('userId', user.userId);
      if (error) throw error;
      
    } catch (error) {
      // alert(error);
      //after reflesh page user should get an error, but... programm read first id (id of the user in database) and the next a userId. Error is becaouse "id" not working
    }
  }
  useEffect(()=>{
    if(isLogged && cartList!== undefined){
      uploadCartList()
    }
  },[cartList,setCartList, isLogged])

  //after refresh? must update orderList from dataBase
  const uploadOrdertList = async()=>{
    try {
      const { data, error } = await supabase.from("ValufiUsersAccount")
      .update([
        {order: userOrders}
      ])
      .eq('userId', user.userId);
      if (error) throw error;
      
    } catch (error) {
      // alert(error);
      //after reflesh page user should get an error, but... programm read first id (id of the user in database) and the next a userId. Error is becaouse "id" not working
    }
  }

  useEffect(()=>{
    if(isLogged && userOrders!== undefined){
      uploadOrdertList()
    }
  },[userOrders, setUserOrders, isLogged])

  return (
    <pageContext.Provider
      value={{
        productsList,
        cartList,
        setCartList,
        cartListTotal,
        setCartListTotal,
        searchItem,
        setSearchItem,
        isLogged,
        setIsLogged,
        userList,
        setUserList,
        user,
        setUser,
        supabase,
        fetchProductsData,
        fetchCartListData,userOrders, setUserOrders
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/category/:productCategory"
            element={<FilterProductPage />}
          />
          <Route
            path="/category/search/:productCategory"
            element={<FilterProductPage />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/change-password-by-email" element={<ChangePasswordByEmail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/myopinions" element={<MyOpinions />} />
          <Route path="/paymentsmethod" element={<PaymentsMethod />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </pageContext.Provider>
  );
}

export default App;
