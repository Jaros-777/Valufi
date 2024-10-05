import NavBar from "./NavBar/NavBar.jsx";
import "./HomePage.scss";
import Advert from "./assets/Adverts/Advert1.png";
import ProductCard from "./ProductCard.jsx";
import { useState, useContext } from "react";
import { pageContext } from "./App";

function HomePage() {

  const { productsList } = useContext(pageContext);
  // console.log(productsList[1])


  return (
    <>
      <NavBar></NavBar>
      <div id="big-advert">
        <img src={Advert} alt="Advert" />
      </div>
      <div id="home-page-container">
        <div id="products-container">
          {productsList.map((e)=>(
            <ProductCard key={e.id} name={e.name} price={e.price} img={e.img} id={e.id}></ProductCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
