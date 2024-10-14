import NavBar from "./NavBar/NavBar.jsx";
import "./Cart.scss";

import { useContext, useEffect } from "react";
import { pageContext } from "./App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const { cartList, setCartList, cartListTotal, setCartListTotal } =
    useContext(pageContext);

  function deleteProduct(id, price) {
    const idInArray = cartList.findIndex((item) => item.id === id); 
    
    const copyCartList = [...cartList];
    const itemToUpdate = copyCartList[idInArray];
    console.log(itemToUpdate.count)

    setCartListTotal(
      (parseFloat(cartListTotal) - (parseFloat(itemToUpdate.count) * parseFloat(price))).toFixed(2)
    );

    setCartList((prevCartList) =>
      prevCartList.filter((item) => item.id !== id)
    );
  }

  function changeCountProduct(id, mark, price) {
    const idInArray = cartList.findIndex((item) => item.id === id);

    const copyCartList = [...cartList];
    const itemToUpdate = copyCartList[idInArray];

    if (mark === "-") {
      if (copyCartList[idInArray].count === 1) {
        deleteProduct(id, price);
      } else {
        itemToUpdate.count -= 1;
        setCartListTotal(
          (parseFloat(cartListTotal) - parseFloat(price)).toFixed(2)
        );
        setCartList(copyCartList);
      }
    } else {
      itemToUpdate.count += 1;
      setCartListTotal(
        (parseFloat(cartListTotal) + parseFloat(price)).toFixed(2)
      );
      setCartList(copyCartList);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <div id="cart-container">
        <div id="cart-products-list">
          {cartList.length === 0 ? (
            <p style={{ fontSize: "5vh" }}>Empty Cart</p>
          ) : (
            cartList.map((e) => (
              <div className="cart-product" key={e.id}>
                <div
                  onClick={() => {
                    navigate(`/product/${e.id}`);
                  }}
                  className="cart-product-img"
                >
                  <img src={e.img} alt="" />
                </div>

                <div className="cart-product-center">
                  <div className="cart-product-count">
                    <button
                      onClick={() => {
                        changeCountProduct(e.id, "-", e.price);
                      }}
                    >
                      -
                    </button>
                    <p>{e.count}</p>
                    <button
                      onClick={() => {
                        changeCountProduct(e.id, "+", e.price);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p
                    onClick={() => {
                      navigate(`/product/${e.id}`);
                    }}
                    style={{ margin: "0vh 1vw" }}
                  >
                    {e.name}
                  </p>
                </div>

                <p id="product-price">{e.price}$</p>
                <button
                  onClick={() => {
                    deleteProduct(e.id, e.price);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        <div id="cart-checkout">
          <p>Summary</p>
          <p>{cartListTotal} $</p>
          <button>Go to payment</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
