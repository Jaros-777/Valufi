import NavBar from "./NavBar/NavBar.jsx";
import "./Cart.scss"

import { useContext, useEffect } from "react";
import { pageContext } from "./App";
import { useNavigate } from 'react-router-dom';

function Cart() {

  const navigate = useNavigate()

    const { cartList, setCartList, cartListTotal, setCartListTotal} = useContext(pageContext);

    function deleteProduct(id){
      setCartList((prevCartList) => prevCartList.filter((item) => item.id !== id))
    }

    function changeCountProduct(id, mark){
      
    }

  return (
    <>
      <NavBar></NavBar>
      <div id="cart-container">
        <div id="cart-products-list">
        {cartList.map((e)=>(
            <div className="cart-product" key={e.id} >
              <div onClick={()=>{navigate(`/product/${e.id}`)}} className="cart-product-img">
              <img  src={e.img} alt="" />
              </div>
                
                <div className="cart-product-center">
                    
                    <div className="cart-product-count">
                    <button onClick={()=>{changeCountProduct(e.id, "-")}}>-</button>
                    <p>{e.count}x </p>
                    <button onClick={()=>{changeCountProduct(e.id, "+")}}>+</button>
                    </div>
                    <p onClick={()=>{navigate(`/product/${e.id}`)}} style={{ margin: "0vh 1vw" }}>{e.name}</p>
                </div>
                
                <p id="product-price">{e.price}$</p>
                <button onClick={()=>{deleteProduct(e.id)}}>Delete</button>
            </div>
        ))}
        </div>
        <div id="cart-checkout">
          <p>Summary</p>
          <p>{cartListTotal} $</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
