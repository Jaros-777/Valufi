import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Login.scss";
import EmailLogo from "./icon-email.png"
import PasswordIcon from "./icon-password.png"
import VisibleIcon from "./icon-visible.png"
import NotVisibleIcon from "./icon-not-visible.png"
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";


function Login() {

  const { isLogged, setIsLogged, supabase, fetchCartListData } = useContext(pageContext)
  const navigate = useNavigate()

  const[userEmail, setUserEmail] = useState("");
  const[userPassword, setUserPassword] = useState("");
  const[wrongPas, setWrongPass] = useState(false);
  const[visiblePass, setVisiblePass] = useState(false);


  


  const Login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      if (error) throw error;
      setIsLogged(true);
      setWrongPass(false)
      fetchCartListData();
      localStorage.setItem('userToken', JSON.stringify( data.session))
      navigate("/")
    } catch (error) {
      setWrongPass(true)
    }
  };

  function changePassVisilbity(){
    
    visiblePass? setVisiblePass(false): setVisiblePass(true)

  }

  return (
    <>
      <NavBar></NavBar>
      {!isLogged? 
      <div id="login-container">
        <div id="login">
          <p>Login</p>
          <div className="login-input">
            <input type="text" placeholder="Email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
            <img src={EmailLogo} alt="Email Icon" id="login-icon"/>
          </div>
          <div className="login-input">
            <input type={visiblePass? "text" : "password" } placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
            <img src={visiblePass? VisibleIcon : NotVisibleIcon } alt="Show/ hide icon Icon" id="show-hide-pass" onClick={()=>{changePassVisilbity()}}/>
            <img src={PasswordIcon} alt="Password Icon" id="login-icon"/>
          </div>
          {wrongPas ?  <p id="incorrect" >Incorrect email or password</p> : <p></p>}
          
          {/* <div id="login-options">
            <div id="remember">
              <input type="checkbox" />
              <p>Remeber Me</p>
            </div>
            <p onClick={()=>navigate("/forgotpassword")} >Forgot password?</p> !!! you must configure SMTP in supabase !!!
          </div> */}
          <button onClick={Login}>Login</button>
          <p id="login-register">
            Don't have an account? <span onClick={()=>{navigate("/register")}}>Register</span>
          </p>
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

export default Login;
