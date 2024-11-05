import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Login.scss";
import EmailLogo from "./icon-email.png"
import PasswordIcon from "./icon-password.png"
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";


function Login() {

  const {  setIsLogged, setCartList, supabase, setUser,cartListTotal, setCartListTotal, fetchCartListData } = useContext(pageContext)
  const navigate = useNavigate()

  const[userEmail, setUserEmail] = useState("");
  const[userPassword, setUserPassword] = useState("");
  const[wrongPas, setWrongPass] = useState(false);



  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
  
    if (error) {
      console.error(error);
    } else {
      return(data.session.access_token)
    }
  };
  


  const Login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      if (error) throw error;
      setUser(data.user)
      setIsLogged(true);
      setWrongPass(false)
      fetchCartListData();
      localStorage.setItem('userToken', JSON.stringify( data.session))
      navigate("/")
    } catch (error) {
      setWrongPass(true)
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div id="login-container">
        <div id="login">
          <p>Login</p>
          <div className="login-input">
            <input type="text" placeholder="Email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
            <img src={EmailLogo} alt="Email Icon" />
          </div>
          <div className="login-input">
            <input type="text" placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
            <img src={PasswordIcon} alt="Password Icon" />
          </div>
          {wrongPas ?  <p id="incorrect" >Incorrect email or password</p> : <p></p>}
          
          <div id="login-options">
            <div id="remember">
              <input type="checkbox" />
              <p>Remeber Me</p>
            </div>
            <p>Forgot password?</p>
          </div>
          <button onClick={Login}>Login</button>
          <p id="login-register">
            Don't have an account? <span onClick={()=>{navigate("/register")}}>Register</span>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
