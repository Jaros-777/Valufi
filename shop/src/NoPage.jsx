
import { useNavigate } from "react-router-dom";
import "./NoPage.scss"

function NoPage() {

  const navigate=useNavigate()
  return (
    <>
      <div id="no-page-container">
        <button onClick={()=>{navigate("/")}}>Go Home</button>
      </div>
    </>
  );
}

export default NoPage;

