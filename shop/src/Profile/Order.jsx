import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Order.scss";
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";

function Order() {
  const { isLogged, userOrders } = useContext(pageContext);
  const navigate = useNavigate();

  if(!userOrders){
    return <p>Loading</p>
  }

  const totalOrder = (id) => {
    let sum = 0;


      const currentOrder = userOrders.find((e) => e.orderId === id);
    
    if (currentOrder !== undefined) {
      currentOrder.products.map((e) => {
        sum +=parseFloat( e.price * e.count);
      });
    }

    return sum.toFixed(2);
  };


  return (
    <>
      <NavBar></NavBar>
      {isLogged ? (
        // <p style={{fontSize:"3vh"}}>You haven't ordered anything yet</p>
        <div id="order-container">
          <div id="order-text">
            <p>Your orders</p>
          </div>
          {userOrders.map((e) => (
            <div className="order" key={e.orderId}>
              <p>Order ID: {e.orderId}</p>
              <p>Date: {e.date}</p>
              {e.products.map((p) => (
                <div className="order-products" key={p.id}>
                  <img
                    style={{ cursor: "pointer" }}
                    src={p.img}
                    alt={p.name}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                    }}
                  />
                  <div className="order-product-details">
                    <p>{p.name}</p>

                    <div className="count-price-container">
                      <p>Amount: {p.count}</p>
                      <p>{p.price}$/ pcs</p>
                      <div id="product-total">
                        <p>Total: {(p.price * p.count).toFixed(2)}$</p>
                      </div>
                    </div>
                  </div>

                  <button>Rate</button>
                </div>
              ))}
              <div id="order-total">
                <p>Total: {totalOrder(e.orderId)} $</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: "12vh",
            height: "59vh",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold" }}>You must be log in</p>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}

export default Order;
