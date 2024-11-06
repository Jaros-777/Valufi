import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Login.scss";
import EmailLogo from "./icon-email.png"
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useParams } from "react-router-dom";


function ForgotPassword() {
  const { supabase,isLogged } = useContext(pageContext)
  // const {forgotpassword} = useParams()
  const [emailToSend, setEmailToSend] = useState("")
  const [redirectURL, setRedirectURL] = useState("")
  const [sended, setSended] = useState(false)

  const SendEmail = async()=>{
    // if(window.location.href[7]== 'l' && forgotpassword === "forgotpassword"){
    //     setRedirectURL("http://localhost:5173/change-password-by-email")
    // }else if(window.location.href[7]== 'v' && forgotpassword === "forgotpassword"){
    //     setRedirectURL("https://valufi.netlify.app/change-password-by-email")
    // }
    
    // await supabase.auth.resetPasswordForEmail(emailToSend, {
    //     redirectTo:  redirectURL,//this not working in supabase you must configure SMTP to send emails
    //   })
    //   setSended(true)
  }

  return (
    <>
      <NavBar></NavBar>
      {!isLogged? 
      <div id="login-container">
        <div id="login">
          <p>Forgot password?</p>
          <div className="login-input">
            <input type="text" placeholder="Email" onChange={(e)=>{setEmailToSend(e.target.value)}}/>
            <img src={EmailLogo} alt="Email Icon" />
          </div>
          {sended? <p>The email has been sent</p>: <p></p>}
          <button onClick={SendEmail}>Send Email</button>
          
        </div>
      </div>
      : 
      <div style={{marginTop:"12vh" ,height:"59vh", color:"black", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <p style={{fontWeight:"bold"}}>You are logged already</p>
      </div>
      }
      <Footer></Footer>
    </>
  );
}

export default ForgotPassword;
