import "./App.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import supabase from "./supabaseClient";

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
  const [productsList, setProductsList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0);
  const [searchItem, setSearchItem] = useState("");

  const [userList, setUserList] = useState(UserList);
  const [isLogged, setIsLogged] = useState(false); // loggedId
  const [user, setUser] = useState(null);

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

  const fetchProductsData = async () => {
    const { data, error } = await supabase.from("ValufiProducts").select("*");

    if (error) {
      console.error(error);
    } else {
      setProductsList(data);
      // const [productsList, setProductsList] = useState(data);
      return data;
      // console.log(data)
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

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
            .reduce((total, value) => total + parseFloat(value.price), 0)
            .toFixed(2)
        );
      }
    }
  };

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
    } else {
      return data.session;
    }
  };

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
          setUser(data.user);
          setIsLogged(true);
        }
      }
    };
    restoreSession()
  }, []);

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
        fetchCartListData
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </pageContext.Provider>
  );
}

export default App;
