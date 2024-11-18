import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Order.scss";
import { useContext } from "react";
import { pageContext } from "../App";

function Order() {
  const { isLogged, userOrders } = useContext(pageContext);

  

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
              <p>Date</p>
              {e.products.map((p) => (
                <div className="order-products" key={p.id}>
                  <img src={p.img} alt={p.name} />
                  <p>{p.name}</p>
                  <p>Count: {p.count}</p>
                  <p>{p.price}$</p>
                  <button>Rate</button>
                </div>
              ))}
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
