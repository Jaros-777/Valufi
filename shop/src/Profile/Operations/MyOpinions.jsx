import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer";
import "./../Order.scss";
import { useContext } from "react";
import { pageContext } from "../../App";

function MyOpinions() {
    const { isLogged} = useContext(pageContext)

  return (
    <>
      <NavBar></NavBar>
      {isLogged ? (
        <div id="order-container">
          <p style={{fontSize:"3vh"}}>You haven't rated anything yet</p>
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

export default MyOpinions;
