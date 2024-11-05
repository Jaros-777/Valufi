import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Login.scss";
import EmailLogo from "./icon-email.png";
import PasswordIcon from "./icon-password.png";
import ProfileIcon from "./icon-profile.png";
import { useContext, useState } from "react";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";

function Register() {
  const { supabase, isLogged } = useContext(pageContext);
  const navigate = useNavigate();

  const [userNewEmail, setNewUserEmail] = useState("");
  const [userNewPassword, setNewUserPassword] = useState("");
  const [userNewName, setNewUserName] = useState("");


  const addToDatabase = async(newUserId)=>{
    try {
      const { data, error } = await supabase.from("ValufiUsersAccount")
      .insert([
        {userId:newUserId,
         cartList: [],
        name: userNewName}
      ])
      if (error) throw error;
      
    } catch (error) {
      alert(error);
    }
  }


  const Register = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userNewEmail,
        password: userNewPassword,
      });
      if (error) throw error;
      addToDatabase(data.user.id)
      navigate("/login")



    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      {!isLogged? 
      <div id="login-container">
        <div id="login">
          <p>Register</p>
          <div className="login-input">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setNewUserName(e.target.value);
              }}
            />
            <img src={ProfileIcon} alt="Email Icon" />
          </div>
          <div className="login-input">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setNewUserEmail(e.target.value);
              }}
            />
            <img src={EmailLogo} alt="Email Icon" />
          </div>
          <div className="login-input">
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => {
                setNewUserPassword(e.target.value);
              }}
            />
            <img src={PasswordIcon} alt="Password Icon" />
          </div>
          <button style={{ marginTop: "5vh" }} onClick={Register}>
            Register
          </button>
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

export default Register;
