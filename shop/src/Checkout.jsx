import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Checkout.scss";
import { useContext, useState } from "react";
import { pageContext } from "./App.jsx";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const {
    user,
    userOrders,
    setUserOrders,
    cartList,
    setCartList,
    cartListTotal,
    setCartListTotal,
  } = useContext(pageContext);

  const [currentPayment, setCurrentPayment] = useState("PayU");
  const [currentDelivery, setCurrentDelivery] = useState("InpostCourier");
  const navigate = useNavigate();

  //add order to json in user database

  const createDate = () => {
    const newDate = new Date();
    let orderDate = "";
    const day = newDate.getDay();
    if (day < 10) {
      orderDate = "0";
    }
    orderDate += day + ".";
    const month = newDate.getMonth() + 1;
    if (month < 10) {
      orderDate += "0";
    }
    orderDate += month + ".";
    const year = newDate.getFullYear();

    orderDate += year + " ";

    const hour = newDate.getHours();
    if (hour < 10) {
      orderDate += "0";
    }
    orderDate += hour + ":";
    const minute = newDate.getHours();
    if (minute < 10) {
      orderDate += "0";
    }
    orderDate += minute;

    return orderDate;
  };

  const addOrder = () => {
    const updatedCartList = cartList.map((e) => ({
      ...e,
      rated: false,
    }));

    const newOrder = {
      orderId: uuidv4(),
      products: updatedCartList,
      date: createDate(),
      paymentMethod: currentPayment,
      delivery: currentDelivery,
    };

    setUserOrders([...userOrders, newOrder]);
    setCartList([]);
    setCartListTotal(0);
    navigate("/");
  };

  if (!user) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <NavBar></NavBar>

      <div id="checkout-container">
        <div id="user-information">
          <h1>Information</h1>
          <p>
            <span style={{ fontWeight: "bold" }}>Name: </span>
            {user.name} {user.surname}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {user.details.address.town}, {user.details.address.street} St.{" "}
            {user.details.address.houseNumber} {user.details.address.town}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Telephone: </span>
            {user.details.telephone}
          </p>
          {/* <button>Change address</button> */}
        </div>
        <div id="checkout-products-list">
          <h1>Cart List</h1>
          {cartList.length === 0 ? (
            <p style={{ fontSize: "5vh" }}>Empty Cart</p>
          ) : (
            cartList.map((e) => (
              <div className="checkout-product" key={e.id}>
                
                  <div className="checkout-product-img">
                    <img src={e.img} alt="img product" />
                  </div>
                  <div id="checkout-product-details">
                  <div className="checkout-product-center">
                    <p>{e.count} x</p>
                    <p style={{ margin: "0vh 1vw" }}>{e.name}</p>
                  </div>
                  <div id="product-price">
                    <p>{e.price}$/ pcs</p>
                    <p>Total: {(e.price * e.count).toFixed(2)}$</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div id="user-payments">
          <h1>Payments Method</h1>
          <p
            style={currentPayment === "PayU" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment("PayU")}
          >
            PayU{" "}
          </p>
          <p
            style={currentPayment === "Przelewy24" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment("Przelewy24")}
          >
            {" "}
            Przelewy24
          </p>
          <p
            style={currentPayment === "Blik" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment("Blik")}
          >
            Blik
          </p>
          <p
            style={currentPayment === "VISA" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment("VISA")}
          >
            VISA
          </p>
          <p
            style={currentPayment === "MasterCard" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment("MasterCard")}
          >
            MasterCard
          </p>
          <p
            style={currentPayment === " ApplePay" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(" ApplePay")}
          >
            Apple Pay
          </p>
          <p
            style={currentPayment === "GooglePay" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment("GooglePay")}
          >
            Google Pay
          </p>
        </div>
        <div id="delivery-container">
          <h1>Delivery</h1>
          <p
            style={currentDelivery === "InpostCourier" ? { scale: "1.2" } : {}}
            onClick={() => setCurrentDelivery("InpostCourier")}
          >
            Inpost courier
          </p>
          <p
            style={
              currentDelivery === "InpostParcelLock" ? { scale: "1.2" } : {}
            }
            onClick={() => setCurrentDelivery("InpostParcelLock")}
          >
            Inpost parcel lock
          </p>
        </div>
        <div id="checkout-details-container">
          <div className="checkout-details">
            <p>Value of products:</p>
            <p>{cartListTotal} $</p>
          </div>
          <div className="checkout-details">
            <p>Delivery:</p>
            <p>
              <span>{currentDelivery === "InpostCourier" ? 3 : 2}</span> $
            </p>
          </div>
        </div>
        <div id="checkout-sum-main">
          <div className="checkout-details">
            <p>Summary</p>
            <p>
              {parseFloat(cartListTotal) +
                parseFloat(currentDelivery === "InpostCourier" ? 3 : 2)}{" "}
              $
            </p>
          </div>
          <div id="demo-info">
            <p>THIS IS ONLY DEMONSTRATION VERSION, YOU CAN'T BUY ANYTHING </p>
          </div>
          <button onClick={addOrder}>Order now</button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Checkout;
