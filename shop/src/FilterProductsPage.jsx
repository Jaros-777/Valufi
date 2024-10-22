import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./HomePage.scss";
import Advert from "./assets/Adverts/Advert1.png";
import ProductCard from "./ProductCard.jsx";
import { useState, useContext, useEffect } from "react";
import { pageContext } from "./App.jsx";
import { useParams } from "react-router-dom";

function FilterProductPage() {

  const { productsList } = useContext(pageContext);
  const { productCategory} = useParams();
  const [viewProductsList, setViewProductList] = useState(productsList.filter((item) => item.category === productCategory))


  useEffect(()=>{
    setViewProductList(productsList.filter((item) => item.category === productCategory))
  },[productsList,productCategory])

  return (
    <>
      <NavBar></NavBar>
      <div id="big-advert">
        <img src={Advert} alt="Advert" />
      </div>
      <div id="home-page-container">
        <div id="products-container">
          {viewProductsList.map((e)=>(
            <ProductCard key={e.id} name={e.name} price={e.price} img={e.img} id={e.id}></ProductCard>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default FilterProductPage;
