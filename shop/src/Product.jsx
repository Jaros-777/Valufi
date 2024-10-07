import "./Product.scss";
import { useContext } from "react";
import { pageContext } from "./App";
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar/NavBar";

function Product() {

    const {productsList} = useContext(pageContext)
    const {productId} = useParams();

    const product = productsList.find(e =>e.id === parseInt(productId))

  return (
    <>
    <NavBar></NavBar>
    <div id="product-container">
    <div id="product-left">
        <img src={product.img} alt="product Image" />
    </div>
    <div id="product-right">
        <p>{product.name}</p>
        <p>{product.price} $</p>
        <div>
            <p>count</p>
            <button>Add to cart</button>
        </div>
        <img src="#" alt="" />
    </div>
    </div>
    </>
  );
}

export default Product;
