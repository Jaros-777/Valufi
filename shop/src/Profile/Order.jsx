import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Order.scss";
import "./OpinionContainer.scss"
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";
import OpinionContainer from "./OpinionContainer";

function Order() {
  const { isLogged, userOrders, user } = useContext(pageContext);
  const navigate = useNavigate();

  if (!userOrders) {
    return <p>Loading</p>;
  }

  const totalOrder = (id) => {
    let sum = 0;

    const currentOrder = userOrders.find((e) => e.orderId === id);

    if (currentOrder !== undefined) {
      currentOrder.products.map((e) => {
        sum += parseFloat((e.price/100).toFixed(2) * e.count);
      });
    }

    return sum.toFixed(2);
  };

  function showOpinionContainer(){
    const con = document.getElementById("opinion-container").style.display
    if(document.getElementById("opinion-container").style.display == "flex"){
      document.getElementById("opinion-container").style.display="none"
    }else{
      document.getElementById("opinion-container").style.display="flex"
    }
  }

  return (
    <>
      <NavBar></NavBar>
      
      {isLogged ? (
        // <p style={{fontSize:"3vh"}}>You haven't ordered anything yet</p>
        <div id="order-container">
          <div id="order-text">
            <p>Your orders</p>
          </div>
          {userOrders
            .slice()
            .reverse()
            .map((e) => (
              <div className="order" key={e.orderId}>
                <p>Order ID: {e.orderId}</p>
                <p>Date: {e.date}</p>
                {e.products.map((p) => (
                  <div className="order-products" key={p.id}>
                    <OpinionContainer img={p.img} name={p.name}></OpinionContainer>
                    <div id="img-container">
                      <img
                        style={{ cursor: "pointer" }}
                        src={p.img}
                        alt={p.name}
                        onClick={() => {
                          navigate(`/product/${p.id}`);
                        }}
                      />
                    </div>

                    <div className="order-product-details">
                      <p
                        onClick={() => {
                          navigate(`/product/${p.id}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {p.name}
                      </p>

                      <div className="count-price-container">
                        <p>Amount: {p.count}</p>
                        <p>{(p.price/100).toFixed(2)}$/ pcs</p>
                        <div id="product-total">
                          <p>Total: {((p.price/100).toFixed(2) * p.count).toFixed(2)}$</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={showOpinionContainer}>Rate</button>
                  </div>
                ))}
                <div id="order-total">
                  <div className="order-total-detail">
                    <p>Payment method:</p>
                    <p>{e.paymentMethod}</p>
                  </div>
                  <div className="order-total-detail">
                    <p>Delivery method:</p>
                    <p>{e.delivery}</p>
                  </div>
                  <div className="order-total-detail">
                    <p>Total:</p>
                    <p>{totalOrder(e.orderId)} $</p>
                  </div>
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
