import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Payments.scss";
import { useContext, useState } from "react";
import { pageContext } from "./App.jsx";
import { v4 as uuidv4 } from 'uuid';

function Payments() {
  const { user, userOrders, setUserOrders, cartList,setCartList, setCartListTotal } = useContext(pageContext);
  //add order to json in user database

  const createDate = ()=>{
      const newDate = new Date();
      let orderDate =""
      const day = newDate.getDay();
      if(day < 10){
        orderDate = "0";
      }
      orderDate += day+".";
      const month = newDate.getMonth()+1;
      if(month < 10){
        orderDate += "0";
      }
      orderDate += month+".";
      const year = newDate.getFullYear();
      
       orderDate += year+" "

      const hour = newDate.getHours();
      if(hour < 10){
        orderDate += "0";
      }
      orderDate += hour+":";
      const minute = newDate.getHours();
      if(minute < 10){
        orderDate += "0";
      }
      orderDate += minute;


      return orderDate
  }


  const addOrder = async () =>{
      
      

      const updatedCartList = cartList.map((e)=>({
        ...e,
        rated: false
      }))

      const newOrder = {
        orderId: uuidv4(),
        products: updatedCartList,
        date: createDate()
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
