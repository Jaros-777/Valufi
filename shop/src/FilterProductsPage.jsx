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
        {/* <div style={{gridColumn:2, width: "100%", display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", border:"2px solid black",borderRadius:"20px", padding: "2vh"}}>
        <p>
        The website is under reconstruction due to the lack of costs for the database. To view the website and learn about its functionality, please visit GitHub</p>
        <p>Sorry for the inconvenience</p>
        <button style={{marginTop:"2vh", border:"2px solid black",borderRadius:"20px", padding:"2vh"}}> <a href="https://github.com/Jaros-777/Valufi">Go to GitHub</a></button>
      </div> */}
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
