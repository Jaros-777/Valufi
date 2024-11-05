import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer.jsx";
import "./HomePage.scss";
import Advert from "./assets/Adverts/Advert1.png";
import ProductCard from "./ProductCard.jsx";
import { useState, useContext, useEffect } from "react";
import { pageContext } from "./App.jsx";
import { useParams } from "react-router-dom";

function FilterProductPage() {

  const { productsList, searchItem } = useContext(pageContext);
  const { productCategory} = useParams();
  const [viewProductsList, setViewProductList] = useState(productsList.filter((item) => item.category === productCategory))


  useEffect(()=>{

    if(window.location.href.split("/")[4] === "search"){
    setViewProductList(productsList.filter((item)=> item.name.toLowerCase().includes(searchItem.toLowerCase())))
    }else{
      setViewProductList(productsList.filter((item) => item.category === productCategory))
    }

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
            <ProductCard key={e.id} name={e.name} price={e.price} img={e.imgURL} id={e.id}></ProductCard>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default FilterProductPage;
