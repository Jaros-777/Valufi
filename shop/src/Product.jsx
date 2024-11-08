import "./Product.scss";
import iconFullStar  from "./assets/icon-full-star.png"
import iconEmptyStar  from "./assets/icon-empty-star.png"
import { useContext, useEffect, useState } from "react";
import { pageContext } from "./App";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";

import Payment from "./assets/payments.png";
import InpostKurier from "./assets/inpost-kurier.png";
import InpostPaczkomat from "./assets/inpost-paczkomat.png";
import FastDelivery from "./assets/fast-delivery.png";

function Product() {
  const {
    productsList,
    cartList,
    setCartList,
    cartListTotal,
    setCartListTotal,
    fetchProductsData,
  } = useContext(pageContext);
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  function AddToCart(id, name, price, img) {
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
        (parseFloat(cartListTotal) + parseFloat(price)).toFixed(2)
      );
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (productsList.length === 0) {
        await fetchProductsData();
      }
    };
    
    fetchData();
  }, [fetchProductsData, productsList.length]);
  useEffect(() => {
    if (productsList.length > 0) {
      const foundProduct = productsList.find((e) => e.id === productId);
      setProduct(foundProduct);
    }
  }, [productsList, productId]);
  
  if (!product) {
    return <p>Ładowanie...</p>;
  }

  return (
    <>
      <NavBar></NavBar>
      <div id="product-container">
        <div id="product-img">
          <img src={product.imgURL} alt="product Image" />
        </div>
        <div id="product-description">
          <p id="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatem, maiores! Possimus voluptates veritatis adipisci
            dignissimos iusto ipsa! Quaerat consectetur, at veritatis iure porro
            totam aperiam tenetur sint voluptas, nam sit. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Cum natus, vitae voluptate odio
            nostrum rem. Molestiae minus maxime voluptatibus voluptas quisquam
            est nihil blanditiis tempora optio assumenda? Iste, cum. Vitae!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
            ducimus quos fuga? Laboriosam quae odit nulla animi deserunt sint
            possimus, ipsam quod culpa a nostrum voluptas labore, consequuntur
            ab sed.
          </p>
        </div>
        <div id="product-right">
          <p id="product-name">{product.name}</p>
          <div id="opinion">
            <img src={iconFullStar} alt="full-star-icon" />
            <img src={iconFullStar} alt="full-star-icon" />
            <img src={iconFullStar} alt="full-star-icon" />
            <img src={iconEmptyStar} alt="empty-star-icon" />
          </div>
          <p id="product-price">{product.price} $</p>
          <div id="count-add-section">
            <button
              onClick={() => {
                AddToCart(
                  product.id,
                  product.name,
                  product.price,
                  product.imgURL
                );
              }}
            >
              Add to cart
            </button>
          </div>
          <div id="payments">
            <p>Possible payments</p>
            <img src={Payment} alt="Payments icons" />
          </div>

          <p style={{ fontSize: "2vh", fontWeight: "bold" }}>
            Shipping methods
          </p>
          <div className="shipping">
            <img src={InpostKurier} alt="" />
            <p>Inpost courier - 0.00$</p>
          </div>
          <div className="shipping">
            <img src={InpostPaczkomat} alt="" />
            <p>Inpost parcel lockers 24/7 - 0.00$</p>
          </div>
          <div className="shipping" style={{ border: "none" }}>
            <img src={FastDelivery} alt="FastDelivery Icon" />
            <p>Shipping within 24 hours</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Product;
