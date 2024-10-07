import "./Product.scss";
import { useContext } from "react";
import { pageContext } from "./App";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

import Payment from "./assets/payments.png";
import InpostKurier from "./assets/inpost-kurier.png";
import InpostPaczkomat from "./assets/inpost-paczkomat.png";

function Product() {
  const { productsList } = useContext(pageContext);
  const { productId } = useParams();

  const product = productsList.find((e) => e.id === parseInt(productId));

  return (
    <>
      <NavBar></NavBar>
      <div id="product-container">
        <div id="product-left">
          <img src={product.img} alt="product Image" />
        </div>
        <div id="product-right">
          <p id="product-name">{product.name}</p>
          <p>opinion</p>
          <p id="product-price">{product.price} $</p>
          <div id="count-add-section">
            <p>1</p>
            <button>Add to cart</button>
          </div>
          <div id="payments">
            <p>Possible payments</p>
            <img src={Payment} alt="Payments icons" />
          </div>

          <p style={{fontSize:"2.5vh", marginTop:"4vh"}}>Shipping methods</p>
          <div className="shipping">
            <img src={InpostKurier} alt="" />
            <p>Inpost courier - 0.00$</p>
          </div>
          <div className="shipping">
            <img src={InpostPaczkomat} alt="" />
            <p>Inpost parcel lockers 24/7 - 0.00$</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
