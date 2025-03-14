import "./ProductCard.scss";
import { useContext, useState } from "react";
import { pageContext } from "./App";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const navigate = useNavigate();
  const { cartList, setCartList, cartListTotal, setCartListTotal } =
    useContext(pageContext);

  const [showInfoBox, setShowInfoBox] = useState(false);

  function ShowInfo() {
    setShowInfoBox(true);

    setTimeout(() => {
      setShowInfoBox(false);
    }, 3000);
  }

  function AddToCart(id, name, price, img) {
    ShowInfo();
    const idInArray = cartList.findIndex((item) => item.id === id);
    if (idInArray !== -1) {
      const copyCartList = [...cartList];
      const itemToUpdate = copyCartList[idInArray];
      if (itemToUpdate) {
        itemToUpdate.count += 1;
      }
      setCartList(copyCartList);
      setCartListTotal(
        (parseFloat(cartListTotal) + parseFloat(price)).toFixed(2)
      );
    } else {
      const newItemCart = {
        id: id,
        count: 1,
        name: name,
        price: price,
        img: img,
      };
      setCartList([...cartList, newItemCart]);
      setCartListTotal(
        (parseFloat(cartListTotal) + parseFloat(price))
      );
    }
  }

  return (
    <>
      {showInfoBox && (
        <div id="info-container">
          <p>Product added to cart</p>
          <div id="animate-container">
            <div id="animate-line"></div>
          </div>
        </div>
      )}

      <div id="product-card-container">
        <img
          onClick={() => {
            navigate(`/product/${props.id}`), window.scrollTo(0, 0);
          }}
          src={props.img}
          alt="Picture of product"
        />
        <div id="product-card-info">
          <div
            className="product-name"
            onClick={() => {
              navigate(`/product/${props.id}`), window.scrollTo(0, 0);
            }}
            style={{ fontWeight: "bold", height: "50%" }}
          >
            {props.name}
            <div className="full-text">{props.name}</div>
          </div>
          <p style={{ height: "20%", marginBottom: "1vh" }}>{(props.price/100).toFixed(2)}$</p>
          <button
            onClick={() => {
              AddToCart(props.id, props.name, props.price, props.img);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
