import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Cart.scss";

import { useContext, useEffect, useState } from "react";
import { pageContext } from "./App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const { cartList, setCartList, cartListTotal, setCartListTotal, user } =
    useContext(pageContext);
  const [showInfoBox, setShowInfoBox] = useState(false);

  function deleteProduct(id, price) {
    const idInArray = cartList.findIndex((item) => item.id === id);

    const copyCartList = [...cartList];
    const itemToUpdate = copyCartList[idInArray];
    // console.log(itemToUpdate.count)

    setCartListTotal(
      (
        parseFloat(cartListTotal) -
        parseFloat(itemToUpdate.count) * parseFloat(price)
      ).toFixed(2)
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

  function ShowInfo() {
    setShowInfoBox(true);

    setTimeout(() => {
      setShowInfoBox(false);
    }, 3000);
  }

  return (
    <>
      {showInfoBox && (
        <div id="info-container">
          <p>Cart is empty</p>
          <div id="animate-container">
            <div id="animate-line"></div>
          </div>
        </div>
      )}
      <NavBar></NavBar>
      <div id="cart-container">
        <div id="cart-products-list">
          {cartList.length === 0 ? (
            <p style={{ fontSize: "2.5rem" }}>Empty Cart</p>
          ) : (
            cartList.map((e) => (
              <div className="cart-product" key={e.id}>
                <div
                  onClick={() => {
                    navigate(`/product/${e.id}`);
                  }}
                  className="cart-product-img"
                >
                  <img src={e.img} alt="img product" />
                </div>

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
                <div id="product-name">
                  <p
                    onClick={() => {
                      navigate(`/product/${e.id}`);
                    }}
                    style={{ margin: "0vh 1vw" }}
                  >
                    {e.name}
                  </p>
                <div className="full-text">{e.name}</div>
                </div>
                <p id="product-price">{(e.price / 100).toFixed(2)}$</p>
                <button
                  id="delete-btn"
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
          <p>{(cartListTotal / 100).toFixed(2)} $</p>
          <button
            onClick={() => {
              cartList.length > 0
                ? user
                  ? (navigate("/checkout"), window.scrollTo(0, 0))
                  : (navigate("/login"), window.scrollTo(0, 0))
                : ShowInfo();
            }}
          >
            Go to payment
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Cart;
