import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Payments.scss";
import { useContext, useState } from "react";
import { pageContext } from "./App.jsx";

function Payments() {
  const { user, userOrders, setUserOrders, cartList,setCartList, setCartListTotal } = useContext(pageContext);

  //add order to json in user database

  const addOrder = async () =>{
    const newOrder = {
        orderId: 123,
        products: cartList,
        rated: false
      };
    
    setUserOrders([...userOrders, newOrder])
    setCartList([])
    setCartListTotal(0)
  }



  return (
    <>
      <NavBar></NavBar>
      <div id="payments-container">
        <button onClick={addOrder}>Order now</button>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Payments;
