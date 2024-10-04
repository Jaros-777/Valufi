import "./NavBar.scss";
import Logo from "./Assets/VALUFI.png";
import Cart from "./Assets/icon-cart.png";
import Profile from "./Assets/icon-profile.png";
import List from "./Assets/icon-list.png";

function NavBar() {
  return (
    <>
      <div id="navbar-container">
        <div id="left">
          <img src={Logo} alt="" />
          <p>Valufi</p>
        </div>
        <div id="center">
          <input type="text" placeholder="Search" />
        </div>
        <div id="right">
          <div className="right-icons" id="list-button">
            <img src={List} alt="List" />
            <div className="drop-menu" id="drop-menu-list">
              <button>cat1</button>
              <button>cat2</button>
              <button>cat3</button>
            </div>
          </div>
          <div className="right-icons" id="cart-button">
            <img src={Cart} alt="cart" />
            <div id="cart-amount">
              <p>2</p>
            </div>
            <div className="drop-menu" id="drop-menu-cart">
              <p>cart</p>
              <p>cart</p>
              <p>cart</p>
              <p>cart</p>
              <p>Total: 0$</p>
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
