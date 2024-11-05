import "./ChangePasswordByEmail.scss";
import { useContext, useState } from "react";
import { pageContext } from "../../App";
import Logo from "../../NavBar/Assets/VALUFI.png";
import { useNavigate } from "react-router-dom";

function ChangePasswordByEmail() {
  const { supabase } = useContext(pageContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
   const navigate = useNavigate();

  function changePassword() {

    navigate("/")
  }

  return (
    <>
        
      <div id="changePasswordByEmail-container">
      <div id="poorNavBar">
            <img src={Logo} alt="Logo Valufi" />
            <p>Valufi</p>
        </div>
        <div  id="change-form">
          <p>Set new password</p>
          <input
            type="text"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <p>Confirm new password</p>
          <input
            type="text"
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
          />
          <button onClick={changePassword}>Change</button>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordByEmail;
