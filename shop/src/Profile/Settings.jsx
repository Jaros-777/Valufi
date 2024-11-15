import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Settings.scss";
import { supabaseAdmin } from "../supabaseClient";
import { useContext, useEffect, useState } from "react";
import { pageContext } from "../App";
import ChangePass from "./Operations/ChangePass";
import ChangeEmail from "./Operations/ChangeEmail";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { isLogged, user, setIsLogged, setCartList, setCartListTotal } =
    useContext(pageContext);
  const [currentOperation, setCurrentOperation] = useState("");

  const navigate = useNavigate();

 


  const logic = () => {
    switch (currentOperation) {
      case "password":
        return <ChangePass></ChangePass>;
      case "email":
        return <ChangeEmail></ChangeEmail>;

      default:
        return <div></div>;
    }
  };

  function confirmDelete() {
    document.getElementById("delete-container").style.display = "flex";
  }
  function closeConfirmDelete() {
    document.getElementById("delete-container").style.display = "none";
  }
  const deleteAccount = async () => {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.userId);
      if(error) throw error;

      setIsLogged(false);
      localStorage.removeItem("userToken");
      setCartList([]);
      setCartListTotal(0);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`Error deleting user: ${error.message}`);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      {isLogged ? (
        <div id="settings-page">
          <div id="setting-container">
            <div id="welcome">
              {user? <p>Welcome {user.name}</p> : <p>Welcome</p>}
            </div>
            <div id="logic">{logic()}</div>
            <div id="functions">
              <button
                onClick={() => {
                  setCurrentOperation("password");
                }}
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  setCurrentOperation("email");
                }}
              >
                Change Email
              </button>
              <button
                onClick={() => {
                  navigate("/myopinions")
                }}
              >
                My opinions
              </button>
              <button
                onClick={() => {
                  navigate("/payments")
                }}
              >
                Payments method
              </button>
            </div>
            <div id="delete">
              <button onClick={confirmDelete}>Delete account</button>
            </div>
            <div id="delete-container">
              <button onClick={closeConfirmDelete} id="close-container">
                X
              </button>
              <p>Are you sure you want to delete your account?</p>
              <button onClick={deleteAccount}>Confirm</button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "12vh",
            height: "59vh",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold" }}>You must be log in</p>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}

export default Settings;
