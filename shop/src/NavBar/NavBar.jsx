import "./NavBar.scss";
import Logo from "./Assets/VALUFI.png";
import Cart from "./Assets/icon-cart.png";
import Profile from "./Assets/icon-profile.png";
import List from "./Assets/icon-list.png";
import Search from "./Assets/icon-search.png";
import { useContext, useEffect, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const {
    cartList,
    setCartList,
    cartListTotal,
    setCartListTotal,
    searchItem,
    setSearchItem,
    isLogged,
    setIsLogged,
    supabase,
    user
  } = useContext(pageContext);
  const navigate = useNavigate();

  function handleSearchSubmit(event){
    if(event.key === 'Enter'){
      searchItemByName();
    }
  }

  function searchItemByName() {
      navigate(`/category/search/${searchItem}`);
      window.scrollTo(0,0)
  }


  async function LogOut(){
    setIsLogged(false);
    localStorage.removeItem('userToken')
    await supabase.auth.signOut();
    setCartList([])
    setCartListTotal(0)
    navigate("/")
    window.location.reload()
    window.scrollTo(0,0)

  }
  return (
    <>
      <div id="navbar-container">
        <div
          onClick={() => {
            navigate("/");
            window.scrollTo(0,0)
          }}
          id="left"
        >
          <img src={Logo} alt="" />
          <p>Valufi</p>
        </div>
        <div id="center">
          <input
            type="text"
            placeholder="Search..."
            value={searchItem}
            onKeyDown={handleSearchSubmit}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <button onClick={searchItemByName}>
            <img src={Search} alt="Search" />
          </button>
        </div>
        <div id="right">
          <div className="right-icons" id="list-button">
            <img src={List} alt="List" />
            <div className="drop-menu" id="drop-menu-list">
              <button
                onClick={() => {
                  navigate(`/category/electronics`);
                  window.scrollTo(0,0)
                }}
              >
                Electronics
              </button>
              <button
                onClick={() => {
                  navigate(`/category/accessories`);
                  window.scrollTo(0,0)
                }}
              >
                Accessories
              </button>
              <button
                onClick={() => {
                  navigate(`/category/jewelry`);
                  window.scrollTo(0,0)
                }}
              >
                Jewelry
              </button>
            </div>
          </div>
          <div  className="right-icons" id="cart-button">
            <img
              onClick={() => {
                navigate("/cart");
                window.scrollTo(0,0)
              }}
              src={Cart}
              alt="cart"
            />
            <div
              onClick={() => {
                navigate("/cart");
                window.scrollTo(0,0)
              }}
              id="cart-amount"
            >
              <p>{cartList.length}</p>
            </div>
            <div id="drop-menu-cart">
              {cartList.length === 0 ? (
                <p style={{ fontSize: "3vh", marginBottom: "2vh" }}>Empty</p>
              ) : (
                cartList.map((e) => (
                  <div className="cart-item" key={e.id}>
                    <div id="left-cart">
                      <img src={e.img} alt="" />
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
                <button
                  onClick={() => {
                    navigate("/cart");
                    window.scrollTo(0,0)
                  }}
                >
                  Checkout
                </button>
                <p>Total: {cartListTotal} $</p>
              </div>
            </div>
          </div>
          <div className="right-icons" id="profile-button">
            <img src={Profile} alt="profile" />
            <div className="drop-menu" id="drop-menu-profile">
              {(isLogged ) ?
                (<div>
                  <p onClick={()=> {navigate("/order"); window.scrollTo(0,0)}}>Order</p>
                  <p onClick={()=> {navigate("/settings") ; window.scrollTo(0,0)}}>Setting</p>
                  <p onClick={LogOut} >Log Out</p>
                </div>): <p onClick={() => {
                    navigate("/login");
                    window.scrollTo(0,0)
                  }}>Login</p>
               } 
            </div>
            
          </div>
          {user?
          <p id="userName" style={{marginLeft:"2vw"}}>{user.name}</p>
          : null
          }
          
        </div>
      </div>
    </>
  );
}

export default NavBar;
