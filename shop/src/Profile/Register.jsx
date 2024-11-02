import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Login.scss";
import EmailLogo from "./icon-email.png";
import PasswordIcon from "./icon-password.png";
import ProfileIcon from "./icon-profile.png";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { pageContext } from "../App";
import { useNavigate } from "react-router-dom";

function Register() {
  const { supabase } = useContext(pageContext);
  const navigate = useNavigate();

  const [userNewEmail, setNewUserEmail] = useState("");
  const [userNewPassword, setNewUserPassword] = useState("");
  const [userNewName, setNewUserName] = useState("");

  // function Register() {
  //   if (
  //     userNewEmail !== null &&
  //     userNewPassword !== null &&
  //     userNewName !== null
  //   ) {
  //     const newUser = {
  //       id: uuidv4(),
  //       name: userNewName,
  //       password: userNewPassword,
  //       email: userNewEmail,
  //       cartList: [],
  //     };

  //     setUserList([...userList, newUser])
  //     setLoggedId(newUser)
  //     // localStorage.setItem('user', newUser.id)
  //     navigate("/")
  //   }
  // }

  const Register = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        // name: userNewName,
        email: userNewEmail,
        password: userNewPassword,
      });
      if (error) throw error;
      navigate("/login")
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div id="login-container">
        <div id="login">
          <p>Register</p>
          {/* <div className="login-input">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setNewUserName(e.target.value);
              }}
            />
            <img src={ProfileIcon} alt="Email Icon" />
          </div> */}
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
      <Footer></Footer>
    </>
  );
}

export default Register;
