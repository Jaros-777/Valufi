import "./OpinionContainer.scss";
import iconEmptyStar from"../assets/icon-empty-star.png";
import iconFullStar from "../assets/icon-full-star.png";

function OpinionContainer(props) {
  return (
    <>
      <div id="opinion-container">
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
              <input type="text" />
            </div>
            <div id="rate-con">
              <p>Rate: </p>
              <button>
                <img src={iconEmptyStar} alt="Rated by star" />
              </button>
              <button className="star">
                <img src={iconEmptyStar} alt="Rated by star" />
              </button>
              <button className="star">
                <img src={iconEmptyStar} alt="Rated by star" />
              </button>
              <button className="star">
                <img src={iconEmptyStar} alt="Rated by star" />
              </button>
              <button className="star">
                <img src={iconEmptyStar} alt="Rated by star" />
              </button>
            </div>
          </div>
        </div>
        <button id="sendBtn">Send</button>
      </div>
    </>
  );
}

export default OpinionContainer;
