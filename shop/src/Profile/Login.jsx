import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Login.scss";
import EmailLogo from "./icon-email.png"
import PasswordIcon from "./icon-password.png"
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";


function Login() {

  const { setIsLogged, setCartList, supabase, setUser,cartListTotal, setCartListTotal } = useContext(pageContext)
  const navigate = useNavigate()

  const[userEmail, setUserEmail] = useState("");
  const[userPassword, setUserPassword] = useState("");
  const[wrongPas, setWrongPass] = useState(false);


  // function Login(){
    
  //   const passwordIn = (userList.find(user => (user.password === userPassword && user.email === userEmail)) !== undefined)
    
  //   passwordIn? setWrondPass(false): setWrondPass(true)

  //   if(passwordIn){
  //     const user = userList.find(user => (user.password === userPassword && user.email === userEmail))
  //     setLoggedId(user)
  //     setCartList(user.cartList)
  //     console.log(user.cartList)

  //     // localStorage.setItem('user', user.id)

  //     navigate("/")
  //   }
  // }

  // const getSession = async () => {
  //   const { data, error } = await supabase.auth.getSession();
  
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(data.session.access_token); // Tutaj znajdziesz informacje o sesji
  //   }
  // };
  
  const fetchCartListData = async () => {
    const { data, error } = await supabase
      .from('ValufiUsersAccount')
      .select("*")

    if (error) {
      console.error(error);
    } else {
      setCartList(data[0].cartList)
      if(data[0].cartList.length > 0){
        // console.log("sum", (data[0].cartList.reduce((total, value) => total + parseFloat(value.price), 0).toFixed(2)))
        // console.log(cartListTotal)
      setCartListTotal(data[0].cartList.reduce((total, value) => total + parseFloat(value.price), 0).toFixed(2))
      }
      
    }
  };


  const Login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      if (error) throw error;
      // console.log(data.user);
      setUser(data.user)
      setIsLogged(true);
      setWrongPass(false)
      // console.log("login ", data.user)
      fetchCartListData();
      // getSession();
      // localStorage.setItem('userToken', getSession())

      

      // navigate("/")
    } catch (error) {
      // alert(error);
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
