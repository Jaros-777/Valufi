import "./OpinionContainer.scss";
import iconEmptyStar from "../assets/icon-empty-star.png";
import iconFullStar from "../assets/icon-full-star.png";
import iconClose from "./icon-close.png";
import { supabase } from "../supabaseClient";
import { pageContext } from "../App";
import { useContext } from "react";
import { useState } from "react";

function OpinionContainer(props) {
  const { userOrders, user } = useContext(pageContext);
  const [opinionCount, setOpinionCount] = useState(4);
  const [opinionDescription, setOpinionDescription] = useState("");

  function closeContainer() {
    document.getElementById("opinion-container").style.display = "none";
    setOpinionCount(4)
  }

  const sendOpinionProduct = async()=>{
   

    try {
      //find product in supabase database
      const { data, error } = await supabase
           .from("ValufiProducts")
           .select("opinions")
           .eq("id", props.id)
      //console.log(data)

      const newOpinion={
        userId: user.id,
        userName: user.name,
        anonymous: false,
        description: opinionDescription,
        rate: opinionCount
        
      }
      //create new opinions array
      const opinionsArray = [...data[0].opinions[0].opinions, newOpinion]

      //console.log(opinionsArray)
      const newAvg = opinionsArray.reduce((total, e)=> total + e.rate, 0)/opinionsArray.length.toFixed(2)
      

      //change main opinion json in supabase
      const newOpinionsFinal = [
        {
          "avgRate": newAvg,
          "opinions": opinionsArray
        }
      ]

      //console.log(newOpinionsFinal)

      //upload
      try {
        const { data, error } = await supabase
          .from("ValufiProducts")
          .update({ opinions: newOpinionsFinal })
          .eq('id', props.id);

          console.log("Sended opinion")

          
      } catch (error) {
        console.log(error);
      }


      
    } catch (error) {
      console.log(error)
    }
      
  }

  async function sendOpinionOrder() {
      const orderIndex = userOrders.findIndex(
        (e) => e.orderId == props.orderId
      );
      const Product = userOrders[orderIndex].products.find(
        (e) => e.id === props.id
      );
      Product.rated = true;

      try {
        const { data, error } = await supabase
          .from("ValufiUsersAccount")
          .update([{ order: userOrders }])
          .eq("userId", user.userId);
      } catch (error) {
        console.log(error);
      }

      await sendOpinionProduct();

       closeContainer();
       window.location.reload();
    
  }

  

  const renderStars = () => {

    let stars =[]

    for(let i=1; i <= 5; i++) {
      stars.push(
      <button key={i}  className="star" onClick={() => setOpinionCount(i )}>
        <img
          src={i > opinionCount ? iconEmptyStar : iconFullStar}
          alt={i > opinionCount ? "iconEmptyStar" : "iconFullStar"}
        />
      </button>)
    }

    return stars;
  };

  return (
    <>
      <div id="opinion-container">
        <div id="close-btn">
          <button onClick={closeContainer}>
            <img src={iconClose} alt="close-icon" />
          </button>
        </div>
        <h1>Add opinion</h1>
        <div id="main-target">
          <div id="opinion-left">
            <div id="img-container">
              <img src={props.img} alt="Image of product" />
            </div>
            <p>{props.name}</p>
          </div>
          <div id="opinion-right">
            <div id="input-con">
              <textarea onChange={((e)=> setOpinionDescription(e.target.value))} type="text" placeholder="Write something..." />
            </div>
            <div id="rate-con">
              <p>Rate: </p>
              {renderStars()}
            </div>
          </div>
        </div>
        <button onClick={()=>{sendOpinionOrder()}} id="sendBtn">
          Send
        </button>
      </div>
    </>
  );
}

export default OpinionContainer;
