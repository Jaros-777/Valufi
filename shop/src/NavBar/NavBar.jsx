import "./NavBar.scss";
import Logo from "./Assets/VALUFI.png";
import Cart from "./Assets/icon-cart.png";
import Profile from "./Assets/icon-profile.png";
import List from "./Assets/icon-list.png";
import Search from "./Assets/icon-search.png";
import { useContext, useState } from "react";
import { pageContext } from "../App";

function NavBar() {
  const { cartList, cartListTotal } = useContext(pageContext);

  return (
    <>
      <div id="navbar-container">
        <div id="left">
          <img src={Logo} alt="" />
          <p>Valufi</p>
        </div>
        <div id="center">
          <input type="text" placeholder="Search..." />
          <button>
            <img src={Search} alt="Search" />
          </button>
        </div>
        <div id="right">
          <div className="right-icons" id="list-button">
            <img src={List} alt="List" />
            <div className="drop-menu" id="drop-menu-list">
              <button>Electronics</button>
              <button>Shoes</button>
              <button>Car Part</button>
            </div>
          </div>
          <div className="right-icons" id="cart-button">
            <img src={Cart} alt="cart" />
            <div id="cart-amount">
              <p>{cartList.length}</p>
            </div>
            <div id="drop-menu-cart">
              {cartList.length === 0 ? (
                <p style={{ fontSize: "3vh", marginBottom: "2vh" }}>Empty</p>
              ) : (
                cartList.map((e) => (
                  <div className="cart-item" key={e.id}>
                    <div id="left-cart">
                      <img src={e.img} alt="" />{" "}
                    </div>
                    <div id="center-cart">
                      <div style={{ width: "10%" }}>{e.count}x</div>
                      <div style={{ margin: "0vh 1vw" }}>{e.name}</div>
                    </div>
                    <div id="right-cart">{e.price} $</div>
                  </div>
                ))
              )}
              <div id="checkout">
                <button>Checkout</button>
                <p>Total: {cartListTotal} $</p>
              </div>
            </div>
          </div>
          <div className="right-icons" id="profile-button">
            <img src={Profile} alt="profile" />
            <div className="drop-menu" id="drop-menu-profile">
              <p>Order</p>
              <p>Setting</p>
              <p>Log Out</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
