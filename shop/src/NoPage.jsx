
import { useNavigate } from "react-router-dom";
import { Route } from 'react-router-dom'
import "./NoPage.scss"

function NoPage() {
  return (
    <>
      <div id="no-page-container">
        <button onClick={()=>{history.push("/")}}>Go Home</button>
      </div>
    </>
  );
}

export default NoPage;

