import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import "./Settings.scss";
import { useContext, useEffect, useState } from "react";
import { pageContext } from "../App";
import ChangePass from "./Operations/ChangePass";

function Settings() {
  const { supabase, isLogged, user } = useContext(pageContext);
  const [currentOperation, setCurrentOperation] = useState("");
  const [userName, setUserName] = useState("")
  
  const logic = () => {
    switch (currentOperation) {
      case "password":
        return (
          <ChangePass></ChangePass>
        );


      default:
        return <div></div>
    }
  };

  function confirmDelete(){
    document.getElementById("delete-container").style.display = "flex"
  }
  function closeConfirmDelete(){
    document.getElementById("delete-container").style.display = "none"
  }
  const deleteAccount=async()=>{
    try {
      const { data, error } = await supabase.auth.admin.deleteUser(
        user.id
      )

    } catch (error) {
      console.log(error)
    }
    
    
  }


  return (
    <>
      <NavBar></NavBar>
      {isLogged ? (
        <div id="settings-page">
          <div id="setting-container">
            <div id="welcome">
              {/* <p>Welcome, {userName}</p> */}
              <p>Welcome, USER</p>
            </div>
            <div id="logic">{logic()}</div>
            <div id="functions">
              <button onClick={()=>{setCurrentOperation("password")}} >Change Password</button>
              <button onClick={()=>{setCurrentOperation("email")}}>Change Email</button>
              <button onClick={()=>{setCurrentOperation("opinons")}}>My opinions</button>
              <button onClick={()=>{setCurrentOperation("payments")}}>Payments method</button>
            </div>
            <div id="delete">
              <button onClick={confirmDelete}>Delete account</button>
            </div>
            <div id="delete-container">
              <button onClick={closeConfirmDelete} id="close-container" >X</button>
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
