import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Checkout.scss";
import { useContext, useState } from "react";
import { pageContext } from "./App.jsx";
import { v4 as uuidv4 } from "uuid";

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

  const [currentPayment, setCurrentPayment] = useState(0);

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
    };

    setUserOrders([...userOrders, newOrder]);
    setCartList([]);
    setCartListTotal(0);
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
           <span style={{fontWeight:'bold'}}>Name: </span>{user.name} {user.surname}
          </p>
          <p>
          <span style={{fontWeight:'bold'}}>Address: </span>
             {user.details.address.town}, {user.details.address.street}{" "}
            St. {user.details.address.houseNumber} {user.details.address.town} /
            {user.details.address.flatNumber}{" "}
          </p>
          <p>
          <span style={{fontWeight:'bold'}}>Telephone: </span>{user.details.telephone}</p>
          <button>Change address</button>
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

                <div className="checkout-product-center">
                  <p>{e.count}</p>
                  <p style={{ margin: "0vh 1vw" }}>{e.name}</p>
                </div>

                <p className="product-price">{e.price}$/ pcs</p>
                <p>Total: {(e.price * e.count).toFixed(2)}$</p>
              </div>
            ))
          )}
        </div>
        <div id="user-payments">
          <h1>Payments Method</h1>
          <p
            style={currentPayment === 0 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(0)}
          >
            PayU{" "}
          </p>
          <p
            style={currentPayment === 1 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(1)}
          >
            {" "}
            Przelewy24
          </p>
          <p
            style={currentPayment === 2 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(2)}
          >
            Blik
          </p>
          <p
            style={currentPayment === 3 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(3)}
          >
            VISA
          </p>
          <p
            style={currentPayment === 4 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(4)}
          >
            MasterCard
          </p>
          <p
            style={currentPayment === 5 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(5)}
          >
            Apple Pay
          </p>
          <p
            style={currentPayment === 6 ? { scale: "1.2" } : {}}
            onClick={() => setCurrentPayment(6)}
          >
            Google Pay
          </p>
        </div>
        <div id="checkout-details-container">
          <div id="checkout-details">
            <p>Value of products: 324$</p>
            <p>Delivery: 324$</p>
          </div>
          <p>Summary</p>
          <p>{cartListTotal} $</p>
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
